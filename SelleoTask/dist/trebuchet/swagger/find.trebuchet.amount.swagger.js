"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerForFindTrebuchetAmount = exports.CombineSwaggerResponses = void 0;
const swagger_1 = require("@nestjs/swagger");
function CombineSwaggerResponses(...responses) {
    return function (target, propertyKey, descriptor) {
        responses.forEach((response) => {
            response(target, propertyKey, descriptor);
        });
    };
}
exports.CombineSwaggerResponses = CombineSwaggerResponses;
exports.SwaggerForFindTrebuchetAmount = CombineSwaggerResponses((0, swagger_1.ApiResponse)({
    status: 200,
    description: 'Trebuchet amount found successfully',
    schema: {
        type: 'number',
        example: 281,
    },
}));
//# sourceMappingURL=find.trebuchet.amount.swagger.js.map