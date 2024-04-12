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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = exports.upload = void 0;
const common_1 = require("@nestjs/common");
const file_helper_1 = require("../helpers/file.helper");
const users_service_1 = require("../_users/users.service");
const multer_1 = require("multer");
const multer = require("multer");
const fs = require("fs-extra");
const storage = (0, multer_1.diskStorage)({
    destination: './uploads',
    filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    },
});
exports.upload = multer({ storage });
let FilesService = class FilesService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async createDirectory(dirname, signedUser) {
        await this.usersService.findAdmin(signedUser);
        const pathToSave = `./uploads/${dirname}`;
        const folderExist = file_helper_1.FileHelper.checkIfFolderExist(pathToSave);
        if (folderExist)
            throw new common_1.ConflictException(`Directory: ${dirname} already exists`);
        if (!folderExist)
            file_helper_1.FileHelper.createFolder(pathToSave);
        return { message: 'Directory created' };
    }
    async findAllDirectories(signedUser) {
        const path = './uploads';
        const isAdmin = await this.usersService.isAdmin(signedUser);
        const foundAllFolders = await file_helper_1.FileHelper.getAllFolders(path, isAdmin);
        return foundAllFolders;
    }
    async addFileToDirectory(dirname, file, signedUser) {
        const isAdmin = await this.usersService.isAdmin(signedUser);
        if (!isAdmin && dirname === 'admin') {
            throw new common_1.BadRequestException('Access to files in the (admin) directory is only for admins');
        }
        const path = `./uploads/${dirname}`;
        if (!file_helper_1.FileHelper.checkIfFolderExist(path)) {
            throw new common_1.ConflictException('Directory to save file not found');
        }
        try {
            if (file instanceof multer_1.MulterError) {
                throw new common_1.ConflictException(file.message);
            }
            console.log(file);
            const filename = `${Date.now()}-${file.originalname}`;
            await fs.writeFile(`${path}/${filename}`, file.buffer);
            return { message: 'File uploaded successfully', filename: filename };
        }
        catch (error) {
            console.error('Error uploading file:', error);
            throw new common_1.ConflictException('Error saving file');
        }
    }
    async findAllFiles(signedUser) {
        const foundFolders = await this.findAllDirectories(signedUser);
        if (!foundFolders)
            return [];
        const directories = [];
        for (const singleDirPath of foundFolders) {
            const filesInDir = [];
            const foundFiles = await file_helper_1.FileHelper.getAllFilesWithDetails(singleDirPath);
            foundFiles.forEach((singleFile) => {
                filesInDir.push({ name: singleFile.name, size: singleFile.size });
            });
            directories.push({ dirname: singleDirPath, files: filesInDir });
        }
        return directories;
    }
    async displayContent(dirname, fileName, signedUser) {
        const isAdmin = await this.usersService.isAdmin(signedUser);
        if (!isAdmin && dirname === 'admin') {
            throw new common_1.BadRequestException('Access to files in the (admin) direcotory is only for admins');
        }
        const path = `./uploads/${dirname}/${fileName}`;
        try {
            const content = await fs.readFile(path, 'utf-8');
            return content;
        }
        catch (error) {
            console.error('Error reading file:', error);
            throw new common_1.NotFoundException(`File: ${fileName} not found in dir: ${dirname}`);
        }
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], FilesService);
//# sourceMappingURL=files.service.js.map