import { SyntaxTreeNode } from './types';

export function evaluate(node: SyntaxTreeNode): number {
  if (node.type === 'NUMBER') {
    return node.value;
  }

  if (node.type === 'BINARY_OP') {
    const leftValue = evaluate(node.left);
    const rightValue = evaluate(node.right);

    switch (node.operator) {
      case '+':
        return leftValue + rightValue;
      case '-':
        return leftValue - rightValue;
      case '*':
        return leftValue * rightValue;
      case '/':
        return leftValue / rightValue;
      default:
        throw new Error(`Unknown operator: ${node.operator}`);
    }
  }

  throw new Error('Unknown node type');
}
