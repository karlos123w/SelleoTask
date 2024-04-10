import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { GetUser } from 'src/auth/get.user.decorator';
import { SignedUser } from 'src/auth/user.interface';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('create-folder/:folderName')
  async createFolder(
    @Param('folderName') folderName: string,
    @GetUser() signedUser: SignedUser,
  ) {
    return await this.filesService.createFolder(folderName, signedUser.id);
  }

  @Get('find-folders')
  async findAllFolders() {
    return await this.filesService.findAllFolders();
  }
}
