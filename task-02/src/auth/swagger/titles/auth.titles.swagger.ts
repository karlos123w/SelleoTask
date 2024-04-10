import { ApiOperation } from '@nestjs/swagger';

export const CreateUserApiOperation = (description: string) =>
  function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({ summary: description })(target, propertyKey, descriptor);
  };

export const AuthSignIn = CreateUserApiOperation(
  '"Sign In" - login an account',
);

export const UsersUploadimage = CreateUserApiOperation(
  '"Upload profile image" - for signed User',
);
