import { Injectable } from '@nestjs/common';
import { EvaluationWorkerHost } from '../evaluation';
// import Piscina from 'piscina';
// import { resolve } from 'path';

@Injectable()
export class EvaluationService {
  constructor(private readonly evaluationWorkerHost: EvaluationWorkerHost) {}

  async evaluateExpressionWorker(expression: string): Promise<number> {
    return this.evaluationWorkerHost.run(expression);
  }
}