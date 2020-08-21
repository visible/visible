import 'reflect-metadata';

import { PluginResolver } from '@visi/core';
import pluginStandard from '@visi/plugin-standard';
import { Container } from 'inversify';

import { CreateRuleUseCase } from '../application/use-cases/create-rule-use-case';
import { Logger } from '../domain/services';
import { TYPES } from '../types';
import { application, framework, interfaces, services } from './containers';

(async () => {
  const container = new Container({ skipBaseClassChecks: true });
  container.load(application, interfaces, services);
  await container.loadAsync(framework);

  const resolver = new PluginResolver(
    new Map([['@visi/plugin-standard', pluginStandard]]),
    {},
  );

  const createRule = container.get<CreateRuleUseCase>(TYPES.CreateRuleUseCase);

  for (const rule of resolver.getRules(['@visi/plugin-standard'])) {
    await createRule.run({
      name: rule.id,
      description: rule.description,
      type: rule.type,
    });
  }

  const logger = container.get<Logger>(TYPES.Logger);
  logger.info('Populating rules successfully completed');
})();
