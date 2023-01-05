import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  ValidationError,
} from '@nestjs/common';
import { iterate } from 'iterare';
import { Request, Response } from 'express';
import { MongoError } from 'mongodb';

export class ValidationException extends HttpException {
  constructor(response) {
    const message = iterate(response)
      .filter((item: ValidationError) => !!item.constraints)
      .reduce((acc, item: ValidationError) => {
        return {
          ...acc,
          [item.property]: Object.values(item.constraints),
        };
      }, {});
    super(message, HttpStatus.BAD_REQUEST);
  }
}

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    response.status(500).json({
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errors = exception.getResponse();
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
      errors: errors,
    });
  }
}
