import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SecurityInterceptor implements NestInterceptor {
  private secretFields: string[] = ['password'];

  constructor(fieldsForRemove?: string[]) {
    if (fieldsForRemove != null && fieldsForRemove.length > 0) {
      for (let field of fieldsForRemove) {
        this.secretFields.push(field);
      }
    }
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        this.secretFields.forEach((field) => {
          if (response[field] != null) {
            delete response[field];
          }
        });
        return response;
      }),
    );
  }
}

export const ResponseFieldSecurity = (...fieldsForRemove: string[]) =>
  UseInterceptors(new SecurityInterceptor(fieldsForRemove));
