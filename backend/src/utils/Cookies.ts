import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export type Cookie<T extends string> = {
  value: T;
  update: (cookie: T, params?: any) => void;
};

export const Cookies = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const response = ctx.switchToHttp().getResponse();

  return {
    value: data ? request.cookies?.[data] : request.cookies,
    update: (value, params) => response.cookie(data, value, params),
  };
});
