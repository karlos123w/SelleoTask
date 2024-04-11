"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerForFindAllFolders = exports.CombineSwaggerResponses = void 0;
const swagger_1 = require("@nestjs/swagger");
function CombineSwaggerResponses(...responses) {
    return function (target, propertyKey, descriptor) {
        responses.forEach((response) => {
            response(target, propertyKey, descriptor);
        });
    };
}
exports.CombineSwaggerResponses = CombineSwaggerResponses;
exports.SwaggerForFindAllFolders = CombineSwaggerResponses((0, swagger_1.ApiResponse)({
    status: 200,
    description: 'All directories found successfully',
    type: [String],
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
                message: 'Directories not found',
            },
        },
    },
}));
//# sourceMappingURL=find.all.folders.swagger.js.map