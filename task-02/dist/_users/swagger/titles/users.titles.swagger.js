"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersDelete = exports.UsersFindUser = exports.UserseditProfile = exports.UsersChangePassByAdmin = exports.UsersUploadimage = exports.UsersSignUp = exports.CreateUserApiOperation = void 0;
const swagger_1 = require("@nestjs/swagger");
const CreateUserApiOperation = (description) => function (target, propertyKey, descriptor) {
    (0, swagger_1.ApiOperation)({ summary: description })(target, propertyKey, descriptor);
};
exports.CreateUserApiOperation = CreateUserApiOperation;
exports.UsersSignUp = (0, exports.CreateUserApiOperation)('"Sign Up" - Create an account');
exports.UsersUploadimage = (0, exports.CreateUserApiOperation)('"Upload profile image" - for signed User');
exports.UsersChangePassByAdmin = (0, exports.CreateUserApiOperation)('"Change Pass By Admin" - for signed User');
exports.UserseditProfile = (0, exports.CreateUserApiOperation)('"Edit Profile" - for signed User');
exports.UsersFindUser = (0, exports.CreateUserApiOperation)('"Find User account" ');
exports.UsersDelete = (0, exports.CreateUserApiOperation)('"Delete User account" - required  permission for {manageWorkers: true}');
//# sourceMappingURL=users.titles.swagger.js.map