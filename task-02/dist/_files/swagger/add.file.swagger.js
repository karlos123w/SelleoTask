"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerForAddFile = exports.CombineSwaggerResponses = void 0;
const swagger_1 = require("@nestjs/swagger");
function CombineSwaggerResponses(...responses) {
    return function (target, propertyKey, descriptor) {
        responses.forEach((response) => {
            response(target, propertyKey, descriptor);
        });
    };
}
exports.CombineSwaggerResponses = CombineSwaggerResponses;
exports.SwaggerForAddFile = CombineSwaggerResponses((0, swagger_1.ApiResponse)({
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
                message: 'Directory to save file not found',
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
}));
//# sourceMappingURL=add.file.swagger.js.map