import { Request, Response } from 'express';
import { ExceptionFilter, Catch, ArgumentsHost, Logger, HttpException, HttpStatus } from '@nestjs/common';

@Catch(Error)
export class ApplicationExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(ApplicationExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const name = exception.name;
    const message = exception.message;

    if (exception instanceof HttpException) {
      statusCode = (exception as HttpException).getStatus();
    }

    this.logger.error(exception);

    response.status(statusCode).json({
      name,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
