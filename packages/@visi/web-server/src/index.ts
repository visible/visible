import 'reflect-metadata';

import { Queue, Worker } from 'bullmq';
import { Container, decorate, injectable } from 'inversify';

import { application, framework, interfaces, services } from './containers';
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
  server.start();

  // Start worker
  container.get(ProcessDiagnosisWorker);
})();
