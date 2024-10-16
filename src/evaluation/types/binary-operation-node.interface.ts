import { SyntaxTreeNode } from './syntax-tree-node.type';

export interface BinaryOperationNode {
  type: 'BINARY_OP';
  operator: string;
  left: SyntaxTreeNode;
  right: SyntaxTreeNode;
}