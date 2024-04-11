import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Files } from './entities/file.entity';
import { Repository } from 'typeorm';
import { FileHelper } from '../helpers/file.helper';
import { UsersService } from '../_users/users.service';
import { MulterError, diskStorage } from 'multer';
import * as multer from 'multer';
import * as fs from 'fs-extra';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

export const upload = multer({ storage });
@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Files)
    private filesModel: Repository<Files>,
    private readonly usersService: UsersService,
  ) {}

  async createFolder(folderName: string, signedUser: string) {
    await this.usersService.findAdmin(signedUser);

    const pathToSave = `./uploads/${folderName}`;

    const folderExist = FileHelper.checkIfFolderExist(pathToSave);
    if (folderExist) throw new ConflictException('Folder already exist');
    if (!folderExist) FileHelper.createFolder(pathToSave);

    return { message: 'Folder created ' };
  }

  async findAllFolders(signedUser: string) {
    const path = './uploads';

    const isAdmin = await this.usersService.isAdmin(signedUser);

    const foundAllFolders = await FileHelper.getAllFolders(path, isAdmin);

    return foundAllFolders;
  }

  async addFileToFolder(folderName: string, file: Express.Multer.File) {
    const path = `./uploads/${folderName}`;

    if (!FileHelper.checkIfFolderExist(path)) {
      throw new ConflictException('Folder to save file not found');
    }

    try {
      if (file instanceof MulterError) {
        throw new BadRequestException(file.message);
      }

      const filename = `${Date.now()}-${file.originalname}`;
      await fs.writeFile(`${path}/${filename}`, file.buffer);

      return { message: 'File uploaded successfully', filename: filename };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new BadRequestException('Error saving file');
    }
  }

  async findAllFiles(signedUser: string) {
    const foundFolders = await this.findAllFolders(signedUser);
    if (!foundFolders) return [];

    type File = { name: string; size: number };
    type Dir = { dirname; files: File[] };

    const directories: Dir[] = [];
    for (const singleDirPath of foundFolders) {
      const filesInDir: File[] = [];

      const foundFiles = await FileHelper.getAllFilesWithDetails(singleDirPath);

      foundFiles.forEach((singleFile) => {
        filesInDir.push({ name: singleFile.name, size: singleFile.size });
      });
      directories.push({ dirname: singleDirPath, files: filesInDir });
    }

    return directories;
  }
}
