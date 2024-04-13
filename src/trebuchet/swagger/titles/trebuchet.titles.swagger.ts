import { ApiOperation } from '@nestjs/swagger';

export const CreateUserApiOperation = (description: string) =>
  function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({ summary: description })(target, propertyKey, descriptor);
  };

export const FindTrebuchetAmount = CreateUserApiOperation(
  '"Find Trebuchet amount" - endpoint returns the result',
);
