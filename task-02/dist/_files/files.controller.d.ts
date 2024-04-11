/// <reference types="multer" />
import { FilesService } from './files.service';
import { SignedUser } from 'src/auth/user.interface';
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
}
