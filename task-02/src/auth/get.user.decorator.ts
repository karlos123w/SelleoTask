import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SignedUser } from './user.interface';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): SignedUser => {
    const request = ctx.switchToHttp().getRequest();

    const newUserData: SignedUser = {
      id: request.user.sub,
      expiration: request.user.exp,
    };
    return newUserData;
  },
);
