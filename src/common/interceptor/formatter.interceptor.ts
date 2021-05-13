import { Injectable } from '@nestjs/common';

import { catchError, map } from 'rxjs/operators';

@Injectable()
export class FormatterInterceptor {
  intercept(context, next) {
    return next.handle().pipe(
      map((data) => {
        return { status: 'success', data };
      }),
      catchError((err): any => {
        return {
          status: 'fail',
          data: err,
        };
      }),
    );
  }
}
