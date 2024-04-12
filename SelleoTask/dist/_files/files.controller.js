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
const files_titles_swagger_1 = require("./swagger/titles/files.titles.swagger");
const create_folder_swagger_1 = require("./swagger/create.folder.swagger");
const add_file_swagger_1 = require("./swagger/add.file.swagger");
const find_all_folders_swagger_1 = require("./swagger/find.all.folders.swagger");
const find_all_files_swagger_1 = require("./swagger/find.all.files.swagger");
const display_content_swagger_1 = require("./swagger/display.content.swagger");
const fs_1 = require("fs");
const common_2 = require("@nestjs/common");
const path_1 = require("path");
const fs = require("fs");
let FilesController = class FilesController {
    constructor(filesService) {
        this.filesService = filesService;
    }
    async createDirectory(dirname, signedUser) {
        return await this.filesService.createDirectory(dirname, signedUser.id);
    }
    async addFileToDirectory(file, dirname, signedUser) {
        return await this.filesService.addFileToDirectory(dirname, file, signedUser.id);
    }
    async findAllDirectories(signedUser) {
        return await this.filesService.findAllDirectories(signedUser.id);
    }
    async findAllFiles(signedUser) {
        return await this.filesService.findAllFiles(signedUser.id);
    }
    async displaContentOfFile(dirname, fileName, signedUser) {
        return await this.filesService.displayContent(dirname, fileName, signedUser.id);
    }
    async getStreamVideo(videoName, headers, res) {
        const appDirectory = fs.realpathSync(process.cwd());
        const videoDirectory = (0, path_1.join)(appDirectory, 'uploads');
        const videoPath = (0, path_1.join)(videoDirectory, `video/${videoName}.mp4`);
        const { size } = (0, fs_1.statSync)(videoPath);
        const videoRange = headers.range;
        if (videoRange) {
            const parts = videoRange.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
            const chunksize = end - start + 1;
            const readStreamfile = (0, fs_1.createReadStream)(videoPath, {
                start,
                end,
                highWaterMark: 60,
            });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${size}`,
                'Content-Length': chunksize,
            };
            res.writeHead(common_1.HttpStatus.PARTIAL_CONTENT, head);
            readStreamfile.pipe(res);
        }
        else {
            const head = {
                'Content-Length': size,
            };
            res.writeHead(common_1.HttpStatus.OK, head);
            (0, fs_1.createReadStream)(videoPath).pipe(res);
        }
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, common_1.Post)('create-directory/:dirname'),
    files_titles_swagger_1.FilesCreateFolder,
    create_folder_swagger_1.SwaggerForCreateDirectory,
    __param(0, (0, common_1.Param)('dirname')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "createDirectory", null);
__decorate([
    (0, common_1.Post)(':dirname/add-file'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    files_titles_swagger_1.FilesAddFile,
    add_file_swagger_1.SwaggerForAddFile,
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('dirname')),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "addFileToDirectory", null);
__decorate([
    (0, common_1.Get)('find-directories'),
    files_titles_swagger_1.FilesFindAllFolder,
    find_all_folders_swagger_1.SwaggerForFindAllFolders,
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "findAllDirectories", null);
__decorate([
    (0, common_1.Get)('find-files'),
    files_titles_swagger_1.FilesFindAllFiles,
    find_all_files_swagger_1.SwaggerForFindAllFiles,
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "findAllFiles", null);
__decorate([
    (0, common_1.Get)(':dirname/display-content/:fileName'),
    files_titles_swagger_1.FilesDisplayContent,
    display_content_swagger_1.SwaggerForDisplayContent,
    __param(0, (0, common_1.Param)('dirname')),
    __param(1, (0, common_1.Param)('fileName')),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "displaContentOfFile", null);
__decorate([
    (0, common_1.Get)('stream/:videoName'),
    (0, common_1.Header)('Accept-Ranges', 'bytes'),
    (0, common_1.Header)('Content-Type', 'video/mp4'),
    __param(0, (0, common_1.Param)('videoName')),
    __param(1, (0, common_2.Headers)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "getStreamVideo", null);
exports.FilesController = FilesController = __decorate([
    (0, common_1.Controller)('files'),
    (0, swagger_1.ApiTags)('files'),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesController);
//# sourceMappingURL=files.controller.js.map