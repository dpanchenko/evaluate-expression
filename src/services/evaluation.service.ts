import { Injectable } from '@nestjs/common';
import { EvaluationWorkerHost } from '../evaluation';

@Injectable()
export class EvaluationService {
  constructor(private readonly evaluationWorkerHost: EvaluationWorkerHost) {}

  async evaluateExpressionWorker(expression: string): Promise<number> {
    return this.evaluationWorkerHost.run(expression);
  }
}