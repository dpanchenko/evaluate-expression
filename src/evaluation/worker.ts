import { parentPort } from 'worker_threads';
import { evaluate } from './evaluate';
import { parseTokens } from './parse-tokens';
import { tokenize } from './tokenize';

parentPort?.on('message', (expression: string) => {
  console.log(`Worker: Evaluating expression ${expression}`);

  const tokens = tokenize(expression);
  const syntaxTree = parseTokens(tokens);

  const result = evaluate(syntaxTree);

  parentPort.postMessage(result);
});