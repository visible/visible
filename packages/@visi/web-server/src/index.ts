import 'reflect-metadata';

import { Queue, Worker } from 'bullmq';
import { Container, decorate, injectable } from 'inversify';

import {
  application,
  framework,
  interfaces,
  services,
} from './frameworks/containers';
import { Server } from './frameworks/server';
import { ProcessDiagnosisWorker } from './frameworks/workers';

(async () => {
  decorate(injectable(), Queue);
  decorate(injectable(), Worker);

  // Inject dependencies
  const container = new Container({ skipBaseClassChecks: true });
  container.load(application, interfaces, services);
  await container.loadAsync(framework);

  // Start server
  const server = new Server(container);

  try {
    server.start();
    container.get(ProcessDiagnosisWorker);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(JSON.stringify(error, null, 2));
  }
})();
