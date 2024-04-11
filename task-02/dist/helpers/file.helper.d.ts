export declare const FileHelper: {
    checkIfFolderExist: (path: string) => any;
    createFolder: (path: string) => void;
    getFileExtension: (file: Express.Multer.File, extensionOnError?: string) => string;
    removeFile: (path: string) => boolean;
    getAllFolders: (path: string, isAdmin: boolean) => Promise<string[]>;
};
