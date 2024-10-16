import { BinaryOperationNode } from './binary-operation-node.interface';
import { NumberNode } from './number-node.interface';

export type SyntaxTreeNode = NumberNode | BinaryOperationNode;