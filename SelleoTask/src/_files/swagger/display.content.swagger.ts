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

export const SwaggerForDisplayContent = CombineSwaggerResponses(
  ApiResponse({
    status: 200,
    description: 'Content displayed as a response',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            file: { type: 'string' },
            fileName: { type: 'string' },
            fileSize: { type: 'number' },
            mimeType: { type: 'string' },
          },
        },
        example: {
          file: '%PDF-1.4\n% ����\n3\n0\nobj\n<< /Type /Catalog /Names...',
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
          message: 'File not found',
        },
      },
    },
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
