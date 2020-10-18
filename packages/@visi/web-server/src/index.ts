import 'reflect-metadata';

import { Queue, QueueEvents, Worker } from 'bullmq';
import { Container, decorate, injectable } from 'inversify';

import { RedisConnector } from './frameworks/connection';
import {
  application,
  framework,
  interfaces,
  services,
} from './frameworks/containers';
import { Server } from './frameworks/server';
import { ProcessDiagnosisWorker } from './frameworks/workers';
import { TYPES } from './types';

(async () => {
  decorate(injectable(), Queue);
  decorate(injectable(), QueueEvents);
  decorate(injectable(), Worker);

  // Inject dependencies
  const container = new Container({ skipBaseClassChecks: true });
  container.load(application, interfaces, services);
  container.bind(RedisConnector).toSelf();
  await container.loadAsync(framework(container.get(RedisConnector)));

  // Start server
  const server = new Server(container);

  try {
    server.start();
    container.get(ProcessDiagnosisWorker);
    container.get(TYPES.ProcessDiagnosisQueueEvents);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(JSON.stringify(error, null, 2));
  }
})();
