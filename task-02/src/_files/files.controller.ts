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
import {
  FilesAddFile,
  FilesCreateFolder,
  FilesDisplayContent,
  FilesFindAllFiles,
  FilesFindAllFolder,
} from './swagger/titles/files.titles.swagger';
import { SwaggerForCreateDirectory } from './swagger/create.folder.swagger';
import { SwaggerForAddFile } from './swagger/add.file.swagger';
import { SwaggerForFindAllFolders } from './swagger/find.all.folders.swagger';
import { SwaggerForFindAllFiles } from './swagger/find.all.files.swagger';
import { SwaggerForDisplayContent } from './swagger/display.content.swagger';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('create-directory/:dirname')
  @FilesCreateFolder
  @SwaggerForCreateDirectory
  async createDirectory(
    @Param('dirname') dirname: string,
    @GetUser() signedUser: SignedUser,
  ) {
    return await this.filesService.createDirectory(dirname, signedUser.id);
  }

  @Post(':dirname/add-file')
  @UseInterceptors(FileInterceptor('file'))
  @FilesAddFile
  @SwaggerForAddFile
  async addFileToDirectory(
    @UploadedFile() file: Express.Multer.File,
    @Param('dirname') dirname: string,
    @GetUser() signedUser: SignedUser,
  ) {
    return await this.filesService.addFileToDirectory(
      dirname,
      file,
      signedUser.id,
    );
  }

  @Get('find-directories')
  @FilesFindAllFolder
  @SwaggerForFindAllFolders
  async findAllDirectories(@GetUser() signedUser: SignedUser) {
    return await this.filesService.findAllDirectories(signedUser.id);
  }

  @Get('find-files')
  @FilesFindAllFiles
  @SwaggerForFindAllFiles
  async findAllFiles(@GetUser() signedUser: SignedUser) {
    return await this.filesService.findAllFiles(signedUser.id);
  }

  @Get(':dirname/display-content/:fileName')
  @FilesDisplayContent
  @SwaggerForDisplayContent
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
