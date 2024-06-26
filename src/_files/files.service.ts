import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  constructor(private readonly usersService: UsersService) {}

  async createDirectory(dirname: string, signedUser: number) {
    await this.usersService.findAdmin(signedUser);

    const pathToSave = `./uploads/${dirname}`;

    const folderExist = FileHelper.checkIfFolderExist(pathToSave);
    if (folderExist)
      throw new ConflictException(`Directory: ${dirname} already exists`);
    if (!folderExist) FileHelper.createFolder(pathToSave);

    return { message: 'Directory created' };
  }

  async findAllDirectories(signedUser: number) {
    const path = './uploads';

    const isAdmin = await this.usersService.isAdmin(signedUser);

    const foundAllFolders = await FileHelper.getAllFolders(path, isAdmin);

    return foundAllFolders;
  }

  async addFileToDirectory(
    dirname: string,
    file: Express.Multer.File,
    signedUser: number,
  ) {
    const isAdmin = await this.usersService.isAdmin(signedUser);

    if (!isAdmin && dirname === 'admin') {
      throw new BadRequestException(
        'Access to files in the (admin) directory is only for admins',
      );
    }

    const path = `./uploads/${dirname}`;

    if (!FileHelper.checkIfFolderExist(path)) {
      throw new ConflictException('Directory to save file not found');
    }

    try {
      if (file instanceof MulterError) {
        throw new ConflictException(file.message);
      }

      const filename = `${Date.now()}-${file.originalname}`;
      await fs.writeFile(`${path}/${filename}`, file.buffer);

      return { message: 'File uploaded successfully', filename: filename };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new ConflictException('Error saving file');
    }
  }

  async findAllFiles(signedUser: number) {
    const foundFolders = await this.findAllDirectories(signedUser);
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

  async displayContent(dirname: string, fileName: string, signedUser: number) {
    const isAdmin = await this.usersService.isAdmin(signedUser);

    if (!isAdmin && dirname === 'admin') {
      throw new BadRequestException(
        'Access to files in the (admin) direcotory is only for admins',
      );
    }
    const path = `./uploads/${dirname}/${fileName}`;

    try {
      const content = await fs.readFile(path, 'utf-8');

      return content;
    } catch (error) {
      console.error('Error reading file:', error);
      throw new NotFoundException(
        `File: ${fileName} not found in dir: ${dirname}`,
      );
    }
  }
}
