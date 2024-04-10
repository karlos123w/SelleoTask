import { Files } from './entities/file.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/_users/users.service';
export declare class FilesService {
    private filesModel;
    private readonly usersService;
    constructor(filesModel: Repository<Files>, usersService: UsersService);
    createFolder(folderName: string, signedUser: string): Promise<{
        message: string;
    }>;
    findAllFolders(): Promise<string[]>;
}
