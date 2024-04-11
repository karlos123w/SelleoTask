"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerForDisplayContent = exports.CombineSwaggerResponses = void 0;
const swagger_1 = require("@nestjs/swagger");
function CombineSwaggerResponses(...responses) {
    return function (target, propertyKey, descriptor) {
        responses.forEach((response) => {
            response(target, propertyKey, descriptor);
        });
    };
}
exports.CombineSwaggerResponses = CombineSwaggerResponses;
exports.SwaggerForDisplayContent = CombineSwaggerResponses((0, swagger_1.ApiResponse)({
    status: 200,
    description: 'Content displayed as a response',
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
                                mimeType: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
    },
}), (0, swagger_1.ApiResponse)({
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
                message: 'Access to files in the (admin) directory is only for admins',
            },
        },
    },
}), (0, swagger_1.ApiResponse)({
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
}), (0, swagger_1.ApiResponse)({
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
}));
//# sourceMappingURL=display.content.swagger.js.map