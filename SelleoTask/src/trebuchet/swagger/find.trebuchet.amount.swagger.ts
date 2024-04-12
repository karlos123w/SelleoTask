import { ApiResponse } from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

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

export const SwaggerForFindTrebuchetAmount = CombineSwaggerResponses(
  ApiResponse({
    status: 200,
    description: 'Trebuchet amount found successfully',
    schema: {
      type: 'number',
      example: 281,
    } as SchemaObject,
  }),
);
