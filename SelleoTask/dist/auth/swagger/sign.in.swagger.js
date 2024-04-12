"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerForLoginUser = exports.CombineSwaggerResponses = void 0;
const swagger_1 = require("@nestjs/swagger");
const users_entity_1 = require("../../_users/entities/users.entity");
function CombineSwaggerResponses(...responses) {
    return function (target, propertyKey, descriptor) {
        responses.forEach((response) => {
            response(target, propertyKey, descriptor);
        });
    };
}
exports.CombineSwaggerResponses = CombineSwaggerResponses;
exports.SwaggerForLoginUser = CombineSwaggerResponses((0, swagger_1.ApiResponse)({
    status: 201,
    description: 'User successfully logged in',
    type: users_entity_1.Users,
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
                message: 'Incorrect password',
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
                message: 'User not found',
            },
        },
    },
}));
//# sourceMappingURL=sign.in.swagger.js.map