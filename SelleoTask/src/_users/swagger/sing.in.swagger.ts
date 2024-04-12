import { ApiResponse } from '@nestjs/swagger';
import { Users } from '../entities/users.entity';

export function CombineSwaggerResponses(...responses: MethodDecorator[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    responses.forEach((response) => {
      response(target, propertyKey, descriptor);
    });
  };
}

export const SwaggerForCreateUser = CombineSwaggerResponses(
  ApiResponse({
    status: 201,
    description: 'Created user object as response',
    type: Users,
  }),
  ApiResponse({
    status: 409,
    description: 'ConflictException',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            status: { type: 'number' },
            flag: { type: 'boolean' },
            message: { type: 'string' },
          },
        },
        example: {
          status: 409,
          flag: false,
          message: 'User with that email already exist',
        },
      },
    },
  }),
  ApiResponse({
    status: 400,
    description: 'BadRequest',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            status: { type: 'number' },
            flag: { type: 'boolean' },
            message: { type: 'string' },
          },
        },
        example: {
          status: 400,
          flag: false,
          message:
            'firstName, lastName, ,phoneNumber, shirtSize or prefferedTechnology should not be empty',
        },
      },
    },
  }),
);
