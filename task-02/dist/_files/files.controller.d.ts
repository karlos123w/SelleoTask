import { FilesService } from './files.service';
import { SignedUser } from 'src/auth/user.interface';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    createFolder(folderName: string, signedUser: SignedUser): Promise<{
        message: string;
    }>;
    findAllFolders(): Promise<string[]>;
}
