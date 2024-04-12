import { ApiOperation } from '@nestjs/swagger';

export const CreateUserApiOperation = (description: string) =>
  function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({ summary: description })(target, propertyKey, descriptor);
  };

export const UsersSignUp = CreateUserApiOperation(
  '"Sign Up" - Create an account',
);

export const UsersFindAll = CreateUserApiOperation(
  '"Find all users" - for Signed User',
);
