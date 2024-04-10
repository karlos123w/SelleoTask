import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Files } from './entities/file.entity';
import { Repository } from 'typeorm';
import { FileHelper } from 'src/helpers/file.helper';
import { UsersService } from 'src/_users/users.service';

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

  async findAllFolders() {
    const path = './uploads';
    const foundAllFolders = FileHelper.getAllFolders(path);

    return foundAllFolders;
  }
}
