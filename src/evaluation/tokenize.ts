import { Token } from './types';

export function tokenize(expression: string): Token[] {
  const tokens: Token[] = [];
  const operators = ['+', '-', '*', '/'];
  let i = 0;

  while (i < expression.length) {
    const char = expression[i];

    if (char === ' ') {
      i++;
      continue;
    }

    if (!isNaN(Number(char))) {
      let num = '';
      while (!isNaN(Number(expression[i])) || expression[i] === '.') {
        num += expression[i];
        i++;
      }
      tokens.push({ type: 'NUMBER', value: num });
      continue;
    }

    if (operators.includes(char)) {
      tokens.push({ type: 'OPERATOR', value: char });
      i++;
      continue;
    }

    if (char === '(' || char === ')') {
      tokens.push({ type: 'PARENTHESIS', value: char });
      i++;
      continue;
    }

    throw new Error(`Unknown symbol: ${char}`);
  }

  return tokens;
}
