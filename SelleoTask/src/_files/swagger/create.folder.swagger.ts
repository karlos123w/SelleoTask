import { ApiResponse } from '@nestjs/swagger';

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

export const SwaggerForCreateDirectory = CombineSwaggerResponses(
  ApiResponse({
    status: 201,
    description: 'Directory created',
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
          message: 'Directory with that dirname already exist',
        },
      },
    },
  }),
  ApiResponse({
    status: 403,
    description: 'Forbidden Exception',
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
          status: 403,
          flag: false,
          message: 'To execute this command you must have the admin role',
        },
      },
    },
  }),
);
