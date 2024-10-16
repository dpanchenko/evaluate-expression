import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { join } from 'path';
import { filter, firstValueFrom, fromEvent, map, Observable } from 'rxjs';
import { Worker } from 'worker_threads';
import { IEvaluationResult } from './types';

@Injectable()
export class EvaluationWorkerHost implements OnApplicationBootstrap, OnApplicationShutdown {
  private worker: Worker;
  private messages$: Observable<IEvaluationResult>;

  onApplicationBootstrap() {
    this.worker = new Worker(join(__dirname, 'evaluation-worker.js'));
    this.messages$ = fromEvent(this.worker, 'message') as Observable<IEvaluationResult>;
  }

  async onApplicationShutdown() {
    this.worker.terminate();
  }

  async run(expression: string): Promise<number> {
    const uuid = randomUUID();
    this.worker.postMessage({ expression, id: uuid });

    return firstValueFrom<number>(
      this.messages$.pipe(
        filter(({ id }) => id === uuid),
        map(({ result }) => result),
      ),
    );
  }
}