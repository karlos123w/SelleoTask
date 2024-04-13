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

export const SwaggerForFindAllUsers = CombineSwaggerResponses(
  ApiResponse({
    status: 200,
    description: 'All Users find successfully',
    type: [Users],
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
          message: 'Unathorized',
        },
      },
    },
  }),
);
