"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersUploadimage = exports.AuthSignIn = exports.CreateUserApiOperation = void 0;
const swagger_1 = require("@nestjs/swagger");
const CreateUserApiOperation = (description) => function (target, propertyKey, descriptor) {
    (0, swagger_1.ApiOperation)({ summary: description })(target, propertyKey, descriptor);
};
exports.CreateUserApiOperation = CreateUserApiOperation;
exports.AuthSignIn = (0, exports.CreateUserApiOperation)('"Sign In" - login an account');
exports.UsersUploadimage = (0, exports.CreateUserApiOperation)('"Upload profile image" - for signed User');
//# sourceMappingURL=auth.titles.swagger.js.map