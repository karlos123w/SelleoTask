"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersFindAll = exports.UsersSignUp = exports.CreateUserApiOperation = void 0;
const swagger_1 = require("@nestjs/swagger");
const CreateUserApiOperation = (description) => function (target, propertyKey, descriptor) {
    (0, swagger_1.ApiOperation)({ summary: description })(target, propertyKey, descriptor);
};
exports.CreateUserApiOperation = CreateUserApiOperation;
exports.UsersSignUp = (0, exports.CreateUserApiOperation)('"Sign Up" - Create an account');
exports.UsersFindAll = (0, exports.CreateUserApiOperation)('"Find all users" - for Signed User');
//# sourceMappingURL=users.titles.swagger.js.map