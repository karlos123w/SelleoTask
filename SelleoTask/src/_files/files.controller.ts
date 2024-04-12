import {
  Controller,
  Get,
  Header,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { GetUser } from '../auth/get.user.decorator';
import { SignedUser } from '../auth/user.interface';
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
import { Response } from 'express';
import { createReadStream, statSync } from 'fs';
import { Headers } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';

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

  @Get('stream/:videoName')
  @Header('Accept-Ranges', 'bytes')
  @Header('Content-Type', 'video/mp4')
  async getStreamVideo(
    @Param('videoName') videoName: string,
    @Headers() headers,
    @Res() res: Response,
  ) {
    const appDirectory = fs.realpathSync(process.cwd());
    const videoDirectory = join(appDirectory, 'uploads');

    const videoPath = join(videoDirectory, `video/${videoName}.mp4`);

    const { size } = statSync(videoPath);
    const videoRange = headers.range;
    if (videoRange) {
      const parts = videoRange.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
      const chunksize = end - start + 1;
      const readStreamfile = createReadStream(videoPath, {
        start,
        end,
        highWaterMark: 60,
      });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Content-Length': chunksize,
      };
      res.writeHead(HttpStatus.PARTIAL_CONTENT, head);
      readStreamfile.pipe(res);
    } else {
      const head = {
        'Content-Length': size,
      };
      res.writeHead(HttpStatus.OK, head);
      createReadStream(videoPath).pipe(res);
    }
  }
}
