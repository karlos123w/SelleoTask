import { ApiOperation } from '@nestjs/swagger';

export const CreateUserApiOperation = (description: string) =>
  function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({ summary: description })(target, propertyKey, descriptor);
  };

export const UsersSignUp = CreateUserApiOperation(
  '"Sign Up" - Create an account',
);

export const UsersUploadimage = CreateUserApiOperation(
  '"Upload profile image" - for signed User',
);

export const UsersChangePassByAdmin = CreateUserApiOperation(
  '"Change Pass By Admin" - for signed User',
);

export const UserseditProfile = CreateUserApiOperation(
  '"Edit Profile" - for signed User',
);

export const UsersFindUser = CreateUserApiOperation('"Find User account" ');

export const UsersDelete = CreateUserApiOperation(
  '"Delete User account" - required  permission for {manageWorkers: true}',
);
