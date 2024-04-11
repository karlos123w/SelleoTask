import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { GetUser } from 'src/auth/get.user.decorator';
import { SignedUser } from 'src/auth/user.interface';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post(':folderName/add-file')
  @UseInterceptors(FileInterceptor('file'))
  async addFileToFolder(
    @UploadedFile() file: Express.Multer.File,
    @Param('folderName') folderName: string,
  ) {
    return await this.filesService.addFileToFolder(folderName, file);
  }

  @Get('find-folders')
  async findAllFolders(@GetUser() signedUser: SignedUser) {
    return await this.filesService.findAllFolders(signedUser.id);
  }

  @Get('find-files')
  async findAllFiles(@GetUser() signedUser: SignedUser) {
    return await this.filesService.findAllFiles(signedUser.id);
  }

  @Get(':dirname/display-content/:fileName')
  async displaContentOfFile(
    @Param('dirname') dirname: string,
    @Param('fileName') fileName: string,
    @GetUser() signedUser: SignedUser,
  ) {
    return await this.filesService.displayContent(
      dirname,
      fileName,
      signedUser.id,
    );
  }
}
