import { TokenType } from './token-type.type';

export interface Token {
  type: TokenType;
  value: string;
}