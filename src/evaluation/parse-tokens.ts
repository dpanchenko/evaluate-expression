import { Token, TokenType, SyntaxTreeNode } from './types';

export function parseTokens(tokens: Token[]): SyntaxTreeNode {
  let index = 0;

  function parseExpression(): SyntaxTreeNode {
    let node = parseTerm();

    while (index < tokens.length && (tokens[index].value === '+' || tokens[index].value === '-')) {
      const operator = tokens[index].value;
      index++;
      const rightNode = parseTerm();
      node = { type: 'BINARY_OP', operator, left: node, right: rightNode };
    }

    return node;
  }

  function parseTerm(): SyntaxTreeNode {
    let node = parseFactor();

    while (index < tokens.length && (tokens[index].value === '*' || tokens[index].value === '/')) {
      const operator = tokens[index].value;
      index++;
      const rightNode = parseFactor();
      node = { type: 'BINARY_OP', operator, left: node, right: rightNode };
    }

    return node;
  }

  function parseFactor(): SyntaxTreeNode {
    const token = tokens[index];

    if (token.type === 'NUMBER') {
      index++;
      return { type: 'NUMBER', value: parseFloat(token.value) };
    }

    if (token.value === '(') {
      index++;
      const node = parseExpression();
      if (tokens[index].value !== ')') {
        throw new Error('Expected closing parenthesis');
      }
      index++;
      return node;
    }

    throw new Error('Unknown token');
  }

  return parseExpression();
}
