"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerForCreateDirectory = exports.CombineSwaggerResponses = void 0;
const swagger_1 = require("@nestjs/swagger");
function CombineSwaggerResponses(...responses) {
    return function (target, propertyKey, descriptor) {
        responses.forEach((response) => {
            response(target, propertyKey, descriptor);
        });
    };
}
exports.CombineSwaggerResponses = CombineSwaggerResponses;
exports.SwaggerForCreateDirectory = CombineSwaggerResponses((0, swagger_1.ApiResponse)({
    status: 201,
    description: 'Directory created',
}), (0, swagger_1.ApiResponse)({
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
}), (0, swagger_1.ApiResponse)({
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
}));
//# sourceMappingURL=create.folder.swagger.js.map