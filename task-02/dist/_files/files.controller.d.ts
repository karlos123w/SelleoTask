/// <reference types="multer" />
import { FilesService } from './files.service';
import { SignedUser } from 'src/auth/user.interface';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    createFolder(folderName: string, signedUser: SignedUser): Promise<{
        message: string;
    }>;
    addFileToFolder(file: Express.Multer.File, folderName: string): Promise<{
        message: string;
        filename: string;
    }>;
    findAllFolders(signedUser: SignedUser): Promise<string[]>;
    findAllFiles(signedUser: SignedUser): Promise<{
        dirname: any;
        files: {
            name: string;
            size: number;
        }[];
    }[]>;
}
