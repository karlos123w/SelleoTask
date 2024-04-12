/// <reference types="multer" />
import { FilesService } from './files.service';
import { SignedUser } from '../auth/user.interface';
import { Response } from 'express';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    createDirectory(dirname: string, signedUser: SignedUser): Promise<{
        message: string;
    }>;
    addFileToDirectory(file: Express.Multer.File, dirname: string, signedUser: SignedUser): Promise<{
        message: string;
        filename: string;
    }>;
    findAllDirectories(signedUser: SignedUser): Promise<string[]>;
    findAllFiles(signedUser: SignedUser): Promise<{
        dirname: any;
        files: {
            name: string;
            size: number;
        }[];
    }[]>;
    displaContentOfFile(dirname: string, fileName: string, signedUser: SignedUser): Promise<any>;
    getStreamVideo(videoName: string, headers: any, res: Response): Promise<void>;
}
