"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindTrebuchetAmount = exports.CreateUserApiOperation = void 0;
const swagger_1 = require("@nestjs/swagger");
const CreateUserApiOperation = (description) => function (target, propertyKey, descriptor) {
    (0, swagger_1.ApiOperation)({ summary: description })(target, propertyKey, descriptor);
};
exports.CreateUserApiOperation = CreateUserApiOperation;
exports.FindTrebuchetAmount = (0, exports.CreateUserApiOperation)('"Find Trebuchet amount" - endpoint returns the result');
//# sourceMappingURL=trebuchet.titles.swagger.js.map