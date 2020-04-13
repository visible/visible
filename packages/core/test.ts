/* eslint-disable */
import { visible } from './dist/main';
import { filter, flatMap, finalize } from 'rxjs/operators';

(async () => {
  const browser = await visible({
    url: 'https://fsn4x.csb.app/',
    config: {
      extends: [],
      plugins: ['@visi/plugin-standard'],
      settings: {
        headless: true,
      },
      rules: {},
    },
  });

  const diagnosis$ = browser.diagnose().pipe(finalize(() => browser.cleanup()));

  diagnosis$.subscribe(progress => {
    const percentage = Math.floor(
      (progress.doneCount / progress.totalCount) * 100,
    );
    console.log(percentage.toString() + '%');
  });

  diagnosis$
    .pipe(flatMap(progress => progress.reports))
    .pipe(filter(report => report.level !== 'ok'))
    .subscribe(report => console.log(report.message));
})();
