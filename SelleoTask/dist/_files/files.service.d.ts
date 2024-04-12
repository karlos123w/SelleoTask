import { UsersService } from '../_users/users.service';
import * as multer from 'multer';
export declare const upload: multer.Multer;
export declare class FilesService {
    private readonly usersService;
    constructor(usersService: UsersService);
    createDirectory(dirname: string, signedUser: number): Promise<{
        message: string;
    }>;
    findAllDirectories(signedUser: number): Promise<string[]>;
    addFileToDirectory(dirname: string, file: Express.Multer.File, signedUser: number): Promise<{
        message: string;
        filename: string;
    }>;
    findAllFiles(signedUser: number): Promise<{
        dirname: any;
        files: {
            name: string;
            size: number;
        }[];
    }[]>;
    displayContent(dirname: string, fileName: string, signedUser: number): Promise<any>;
}
