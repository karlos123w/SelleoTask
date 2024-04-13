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

export const SwaggerForAddFile = CombineSwaggerResponses(
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
          message: 'Directory to save file not found',
        },
      },
    },
  }),
  ApiResponse({
    status: 400,
    description: 'BadRequestException',
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
            'Access to files in the (admin) directory is only for admins',
        },
      },
    },
  }),
);
