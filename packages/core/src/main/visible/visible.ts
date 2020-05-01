import { launch } from 'puppeteer';
import { ConnectableObservable, from, of } from 'rxjs';
import {
  concatMap,
  count,
  map,
  mergeAll,
  publish,
  reduce,
  withLatestFrom,
} from 'rxjs/operators';

import { Config, Report } from '../../shared';
import { Driver, DriverImpl } from '../driver';
import { Gateway } from '../gateway';
import { ModuleServer, ModuleServerImpl } from '../module-server';
import {
  PostProcessor,
  ScreenshotFetcher,
  SourceMapper,
} from '../post-processors';
import { SourceStore, SourceStoreImpl } from '../source-store';
import { Serializable } from '../utils/serialize';
import { resolveExtends } from './config';
import { createLaunchOptionsFromSettings } from './from-settings';

export interface Letterhead {
  readonly title: string;
  readonly url: string;
  readonly screenshot: string;
}

export interface Progress {
  readonly report: Report;
  readonly totalCount: number;
  readonly doneCount: number;
}

export class Visible {
  private postProcessors: PostProcessor[] = [];

  private constructor(
    private readonly config: Config,
    private readonly driver: Driver,
    private readonly sourceStore: SourceStore,
    private readonly moduleServer: ModuleServer,
    private readonly gateway: Gateway,
  ) {}

  static async init(rawConfig: Config) {
    const config = resolveExtends(rawConfig);
    const launchOptions = createLaunchOptionsFromSettings(
      config.settings ?? {},
    );

    const browser = await launch(launchOptions);
    const page = await browser.newPage();
    const cdp = await page.target().createCDPSession();
    await cdp.send('DOM.enable');
    await cdp.send('CSS.enable');

    const driver = new DriverImpl(browser, page);
    const sourceStore = new SourceStoreImpl(page, cdp);
    const moduleServer = new ModuleServerImpl(page);
    const gateway = new Gateway(driver);

    const visible = new Visible(
      config,
      driver,
      sourceStore,
      moduleServer,
      gateway,
    );

    visible.postProcessors = [ScreenshotFetcher, SourceMapper].map(
      (PostProcessor) =>
        new PostProcessor({
          cdp,
          driver,
          sourceStore,
          config,
        }),
    );

    return visible;
  }

  async open(url: string) {
    await this.moduleServer.listen();
    await this.driver.openURL(url);

    if (this.config?.settings?.delay) {
      await this.driver.waitFor(this.config.settings.delay);
    }

    await this.gateway.prepare();
    await this.gateway.declare({
      __VISIBLE_CONFIG__: this.config as Serializable,
      __VISIBLE_PLUGINS__: [], // should be handled in other place
    });
    await this.gateway.onReady();
    await this.moduleServer.end();
  }

  close() {
    return this.driver.close();
  }

  async fetchLetterhead() {
    const screenshot = 'tmp/' + Date.now().toString() + '.png';
    const title = await this.driver.getTitle();
    const url = this.driver.getURL();

    await this.driver.takeScreenshotForPage({
      path: screenshot,
    });

    const letterhead: Letterhead = {
      screenshot,
      title,
      url,
    };

    return letterhead;
  }

  getSources() {
    return this.sourceStore.getSources();
  }

  private runPostProcessors(report: Report) {
    return from(this.postProcessors).pipe(
      reduce(
        (report$, postProcessor) =>
          report$.pipe(concatMap((report) => from(postProcessor.run(report)))),
        of(report),
      ),
      mergeAll(),
    );
  }

  diagnose() {
    const rules$ = from(this.gateway.listRules()).pipe(mergeAll());

    const progress$ = rules$.pipe(
      concatMap((rule) => this.gateway.processRule(rule)),
      mergeAll(),
      concatMap((report) => this.runPostProcessors(report)),
      withLatestFrom(rules$.pipe(count())),
      map(
        ([report, totalCount], i): Progress => ({
          report,
          totalCount,
          doneCount: i + 1,
        }),
      ),
      publish(),
    ) as ConnectableObservable<Progress>;

    progress$.connect();

    return progress$;
  }
}
