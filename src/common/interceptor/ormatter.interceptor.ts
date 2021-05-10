import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class FormatterInterceptor {
  intercept(context, next) {
    console.log('Before...');

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        console.log(`After... ${Date.now() - now}ms`);
        console.log('Successful request');
        // TODO: add successful response format
      }),
      catchError((err) => {
        console.log(`Error message: ${err}`);
        return throwError(new InternalServerErrorException(err));
        // TODO: add error response format
      }),
    );
  }
}
