import { parentPort } from 'worker_threads';
import { IEvaluationPayload, IEvaluationResult } from './types';

// Event listener for messages from the main thread
parentPort?.on('message', ({ id, expression }: IEvaluationPayload) => {
  console.log(`Worker ${id}: Evaluating expression ${expression}`);

  const result: IEvaluationResult = {
    id,
    result: 1,
  }

  parentPort.postMessage(result);
});