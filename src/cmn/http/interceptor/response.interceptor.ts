import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ResponseDto } from '../dto/response.dto';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ErrorType } from '../enum';
import { AllHttpType } from '../http-error-type';

@Injectable()
export class HttpResponseInterceptor<T> implements NestInterceptor<T> {
  /**
   * Intercept the request and add the timestamp
   * @param context {ExecutionContext}
   * @param next {CallHandler}
   * @returns { payload:Response<T>, timestamp: string }
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDto<T>> {
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;
    const status = AllHttpType[statusCode] ?? '';
    const timestamp = new Date().getTime();
    return next.handle().pipe(
      map((payload) => {
        return { statusCode, status, payload, timestamp };
      }),
    );
  }
}
