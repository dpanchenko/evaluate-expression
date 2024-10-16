import { Body, Controller, Post } from '@nestjs/common';
import { EvaluationService } from '../services';
import { EvaluateExpressionRequestDto, EvaluateExpressionResponseDto } from '../dto';

@Controller()
export class AppController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post('evaluate')
  async evaluateExpression(@Body() body: EvaluateExpressionRequestDto): Promise<EvaluateExpressionResponseDto> {
    const evaluationResult = await this.evaluationService.evaluateExpressionWorker(body.expression);

    return {
      result: evaluationResult,
    };
  }
}
