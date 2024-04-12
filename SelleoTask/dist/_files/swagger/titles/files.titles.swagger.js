"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesDisplayContent = exports.FilesFindAllFiles = exports.FilesFindAllFolder = exports.FilesAddFile = exports.FilesCreateFolder = exports.CreateUserApiOperation = void 0;
const swagger_1 = require("@nestjs/swagger");
const CreateUserApiOperation = (description) => function (target, propertyKey, descriptor) {
    (0, swagger_1.ApiOperation)({ summary: description })(target, propertyKey, descriptor);
};
exports.CreateUserApiOperation = CreateUserApiOperation;
exports.FilesCreateFolder = (0, exports.CreateUserApiOperation)('"Create Directory" - only for admins');
exports.FilesAddFile = (0, exports.CreateUserApiOperation)('"Add File to Directory" - The admin directory is secured only for admins');
exports.FilesFindAllFolder = (0, exports.CreateUserApiOperation)('"Find all Directories" - The admin directory is secured only for admins');
exports.FilesFindAllFiles = (0, exports.CreateUserApiOperation)('"Find all Files" - The admin directory is secured only for admins');
exports.FilesDisplayContent = (0, exports.CreateUserApiOperation)('"Display Content of Files" - The admin directory is secured only for admins');
//# sourceMappingURL=files.titles.swagger.js.map