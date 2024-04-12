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

export const SwaggerForFindAllFiles = CombineSwaggerResponses(
  ApiResponse({
    status: 200,
    description: 'All files in directory found successfully',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            dirname: { type: 'string' },
            files: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  size: { type: 'number' },
                },
              },
            },
          },
        },
        example: {
          dirname: './uploads/Server compiled',
          files: [
            { name: '.DS_Store', size: 6148 },
            {
              name: '1712809983771-ssstik.io_1712492715407.mp4',
              size: 9441499,
            },
            { name: 'zrzutek.png', size: 58104 },
          ],
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
