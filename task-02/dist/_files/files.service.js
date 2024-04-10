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
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const file_entity_1 = require("./entities/file.entity");
const typeorm_2 = require("typeorm");
const file_helper_1 = require("../helpers/file.helper");
const users_service_1 = require("../_users/users.service");
let FilesService = class FilesService {
    constructor(filesModel, usersService) {
        this.filesModel = filesModel;
        this.usersService = usersService;
    }
    async createFolder(folderName, signedUser) {
        await this.usersService.findAdmin(signedUser);
        const pathToSave = `./uploads/${folderName}`;
        const folderExist = file_helper_1.FileHelper.checkIfFolderExist(pathToSave);
        if (folderExist)
            throw new common_1.ConflictException('Folder already exist');
        if (!folderExist)
            file_helper_1.FileHelper.createFolder(pathToSave);
        return { message: 'Folder created ' };
    }
    async findAllFolders() {
        const path = './uploads';
        const foundAllFolders = file_helper_1.FileHelper.getAllFolders(path);
        return foundAllFolders;
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(file_entity_1.Files)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], FilesService);
//# sourceMappingURL=files.service.js.map