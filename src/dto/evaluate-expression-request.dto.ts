import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EvaluateExpressionRequestDto {
  @ApiProperty({
    type: String,
    description: 'Expression for evaluation',
    example: '(1 - 1) * 2 + 3 * (1 - 3 + 4) + 10 / 2'
  })
  @IsString()
  expression: string;
}
