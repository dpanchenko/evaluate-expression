import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class EvaluateExpressionResponseDto {
  @ApiProperty({
    type: String,
    description: 'Evaluation result',
  })
  @IsNumber()
  result: number;
}
