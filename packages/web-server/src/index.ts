import 'reflect-metadata';

import { Container } from 'inversify';

import { application, framework, interfaces, services } from './containers';
import { Server } from './frameworks/server';
import { ProcessDiagnosisWorker } from './frameworks/workers';

(async () => {
  const container = new Container();
  container.load(application, interfaces, services);
  await container.loadAsync(framework);
  const server = new Server(container);
  server.start();
  const worker = container.get(ProcessDiagnosisWorker);
  worker.start();
})();
