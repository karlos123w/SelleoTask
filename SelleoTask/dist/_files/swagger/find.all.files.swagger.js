"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerForFindAllFiles = exports.CombineSwaggerResponses = void 0;
const swagger_1 = require("@nestjs/swagger");
function CombineSwaggerResponses(...responses) {
    return function (target, propertyKey, descriptor) {
        responses.forEach((response) => {
            response(target, propertyKey, descriptor);
        });
    };
}
exports.CombineSwaggerResponses = CombineSwaggerResponses;
exports.SwaggerForFindAllFiles = CombineSwaggerResponses((0, swagger_1.ApiResponse)({
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
//# sourceMappingURL=find.all.files.swagger.js.map