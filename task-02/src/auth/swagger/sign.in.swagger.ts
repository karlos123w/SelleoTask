import { ApiResponse } from '@nestjs/swagger';
import { Users } from '../../_users/entities/users.entity';

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

export const SwaggerForLoginUser = CombineSwaggerResponses(
  ApiResponse({
    status: 201,
    description: 'User successfully logged in',
    type: Users,
  }),
  ApiResponse({
    status: 401,
    description: 'Unauthorized',
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
          status: 401,
          flag: false,
          message: 'Incorrect password',
        },
      },
    },
  }),
  ApiResponse({
    status: 404,
    description: 'Not found',
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
          status: 404,
          flag: false,
          message: 'User not found',
        },
      },
    },
  }),
);
