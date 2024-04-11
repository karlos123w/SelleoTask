"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const files_service_1 = require("./files.service");
const get_user_decorator_1 = require("../auth/get.user.decorator");
const platform_express_1 = require("@nestjs/platform-express");
let FilesController = class FilesController {
    constructor(filesService) {
        this.filesService = filesService;
    }
    async createFolder(folderName, signedUser) {
        return await this.filesService.createFolder(folderName, signedUser.id);
    }
    async addFileToFolder(file, folderName) {
        return await this.filesService.addFileToFolder(folderName, file);
    }
    async findAllFolders(signedUser) {
        return await this.filesService.findAllFolders(signedUser.id);
    }
    async findAllFiles(signedUser) {
        return await this.filesService.findAllFiles(signedUser.id);
    }
    async displaContentOfFile(dirname, fileName, signedUser) {
        return await this.filesService.displayContent(dirname, fileName, signedUser.id);
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, common_1.Post)('create-folder/:folderName'),
    __param(0, (0, common_1.Param)('folderName')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "createFolder", null);
__decorate([
    (0, common_1.Post)(':folderName/add-file'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('folderName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "addFileToFolder", null);
__decorate([
    (0, common_1.Get)('find-folders'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "findAllFolders", null);
__decorate([
    (0, common_1.Get)('find-files'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "findAllFiles", null);
__decorate([
    (0, common_1.Get)(':dirname/display-content/:fileName'),
    __param(0, (0, common_1.Param)('dirname')),
    __param(1, (0, common_1.Param)('fileName')),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "displaContentOfFile", null);
exports.FilesController = FilesController = __decorate([
    (0, common_1.Controller)('files'),
    (0, swagger_1.ApiTags)('files'),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesController);
//# sourceMappingURL=files.controller.js.map