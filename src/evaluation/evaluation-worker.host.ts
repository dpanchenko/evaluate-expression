import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { join } from 'path';
import { finalize, firstValueFrom, fromEvent, map, Observable } from 'rxjs';
import { Worker } from 'worker_threads';
import { IEvaluationResult } from './types';

@Injectable()
export class EvaluationWorkerHost {
  async run(expression: string): Promise<number> {
    const worker = new Worker(join(__dirname, 'evaluation-worker.js'));
    const messages$ = fromEvent(worker, 'message') as Observable<IEvaluationResult>;

    worker.on('error', (e) => console.log('on error', e));

    const uuid = randomUUID();
    worker.postMessage({ expression, id: uuid });

    return firstValueFrom<number>(
      messages$.pipe(
        map(({ result }) => result),
        finalize(() => worker.terminate()),
      ),
    );
  }
}