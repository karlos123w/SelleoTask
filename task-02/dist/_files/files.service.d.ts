import { UsersService } from '../_users/users.service';
import * as multer from 'multer';
export declare const upload: multer.Multer;
export declare class FilesService {
    private readonly usersService;
    constructor(usersService: UsersService);
    createDirectory(dirname: string, signedUser: string): Promise<{
        message: string;
    }>;
    findAllDirectories(signedUser: string): Promise<string[]>;
    addFileToDirectory(dirname: string, file: Express.Multer.File, signedUser: string): Promise<{
        message: string;
        filename: string;
    }>;
    findAllFiles(signedUser: string): Promise<{
        dirname: any;
        files: {
            name: string;
            size: number;
        }[];
    }[]>;
    displayContent(dirname: string, fileName: string, signedUser: string): Promise<any>;
}
