import 'reflect-metadata';

import { PluginResolver } from '@visi/core';
import pluginStandard from '@visi/plugin-wcag';
import { Container } from 'inversify';

import { CreateRuleUseCase } from '../../application/use-cases/create-rule-use-case';
import { Logger } from '../../domain/services';
import { TYPES } from '../../types';
import { RedisConnector } from '../connection';
import { application, framework, interfaces, services } from '../containers';
import { VisiblePool } from '../services/analyzer/visible-pool';

(async () => {
  const container = new Container({ skipBaseClassChecks: true });
  container.load(application, interfaces, services);
  container.bind(RedisConnector).toSelf();
  await container.loadAsync(framework(container.get(RedisConnector)));

  const resolver = new PluginResolver(
    new Map([['@visi/plugin-wcag', pluginStandard]]),
    {},
  );

  const createRule = container.get<CreateRuleUseCase>(TYPES.CreateRuleUseCase);

  for (const rule of resolver.getRules(['@visi/plugin-wcag'])) {
    await createRule.run({
      coreId: rule.id,
      name: rule.name,
      type: rule.type,
      description: rule.description,
      keywords: rule.keywords,
      mapping: rule.mapping,
    });
  }

  const logger = container.get<Logger>(TYPES.Logger);
  logger.log('Populating rules successfully completed');

  const pool = container.get<VisiblePool>(TYPES.VisiblePool);
  await pool.drain();
  await pool.clear();
})();
