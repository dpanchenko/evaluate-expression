import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { finalize, firstValueFrom, fromEvent, map, Observable } from 'rxjs';
import { Worker } from 'worker_threads';

@Injectable()
export class EvaluationService {
  async evaluateExpressionWorker(expression: string): Promise<number> {
    const worker = new Worker(join(__dirname, '..', 'evaluation', 'worker.js'));
    const messages$ = fromEvent(worker, 'message') as Observable<number>;

    worker.on('error', (e) => console.log('on error', e));

    worker.postMessage(expression);

    return firstValueFrom<number>(
      messages$.pipe(
        map((result) => result),
        finalize(() => worker.terminate()),
      ),
    );
  }
}