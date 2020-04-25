import { Visible } from '@visi/core';
import { inject, injectable } from 'inversify';
import uuid from 'uuid/v4';

import { Diagnosis, Status } from '../../domain/models';
import { TYPES } from '../../types';
import { DiagnosisRepository } from '../repositories/diagnosis-repository';
import {
  CreateDiagnosisRequest,
  CreateDiagnosisUseCase,
} from '../use-cases/create-diagnosis-use-case';

@injectable()
export class CreateDiagnosisInteractor implements CreateDiagnosisUseCase {
  @inject(TYPES.DiagnosisRepository)
  private readonly repository: DiagnosisRepository;

  async run(params: CreateDiagnosisRequest) {
    const visible = await Visible.init({});
    await visible.open(params.url);

    const diagnosis = new Diagnosis({
      id: uuid(),
      status: Status.STARTED,
      screenshot: '',
      reports: [],
      totalCount: 0,
      doneCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.repository.create(diagnosis);

    return { diagnosis };
  }
}
