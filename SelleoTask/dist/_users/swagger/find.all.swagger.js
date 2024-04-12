"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerForFindAllUsers = exports.CombineSwaggerResponses = void 0;
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
exports.SwaggerForFindAllUsers = CombineSwaggerResponses((0, swagger_1.ApiResponse)({
    status: 200,
    description: 'All Users find successfully',
    type: [users_entity_1.Users],
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
//# sourceMappingURL=find.all.swagger.js.map