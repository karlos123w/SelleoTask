"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerForCreateUser = exports.CombineSwaggerResponses = void 0;
const swagger_1 = require("@nestjs/swagger");
const users_entity_1 = require("../entities/users.entity");
function CombineSwaggerResponses(...responses) {
    return function (target, propertyKey, descriptor) {
        responses.forEach((response) => {
            response(target, propertyKey, descriptor);
        });
    };
}
exports.CombineSwaggerResponses = CombineSwaggerResponses;
exports.SwaggerForCreateUser = CombineSwaggerResponses((0, swagger_1.ApiResponse)({
    status: 201,
    description: 'Created user object as response',
    type: users_entity_1.Users,
}), (0, swagger_1.ApiResponse)({
    status: 406,
    description: 'NotAcceptableException',
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
                status: 406,
                flag: false,
                message: 'User with the given email already exists',
            },
        },
    },
}), (0, swagger_1.ApiResponse)({
    status: 400,
    description: 'BadRequest',
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
                message: 'firstName, lastName, ,phoneNumber, shirtSize or prefferedTechnology should not be empty',
            },
        },
    },
}));
//# sourceMappingURL=sing.in.swagger.js.map