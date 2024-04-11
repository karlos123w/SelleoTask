"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHelper = void 0;
const fs = require("fs-extra");
const checkIfFolderExist = (path) => {
    return fs.existsSync(path);
};
const createFolder = (path) => {
    fs.mkdir(path, { recursive: true });
};
const getFileExtension = (file, extensionOnError) => {
    if (!file.originalname)
        return extensionOnError;
    const value = file.originalname.split('.')[1];
    return value;
};
const getAllFolders = async (path, isAdmin) => {
    const folders = [];
    try {
        const entries = await fs.readdir(path, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.isDirectory()) {
                if (!isAdmin && entry.name === 'admin') {
                    continue;
                }
                const subPath = `${path}/${entry.name}`;
                folders.push(subPath);
                const subFolders = await getAllFolders(subPath, isAdmin);
                folders.push(...subFolders);
            }
        }
    }
    catch (error) {
        console.error('Error reading directory:', error);
    }
    return folders;
};
const getAllFilesWithDetails = async (path) => {
    const files = [];
    try {
        const entries = await fs.readdir(path, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.isFile()) {
                const fullPath = `${path}/${entry.name}`;
                const stats = await fs.stat(fullPath);
                files.push({
                    name: entry.name,
                    size: stats.size,
                });
            }
            else if (entry.isDirectory()) {
                const subPath = `${path}/${entry.name}`;
                const subFiles = await getAllFilesWithDetails(subPath);
                files.push(...subFiles.map((file) => ({
                    ...file,
                    name: `${entry.name}/${file.name}`,
                })));
            }
        }
    }
    catch (error) {
        console.error('Error reading directory:', error);
    }
    return files;
};
const removeFile = (path) => {
    let resoult = true;
    fs.unlink(path, (err) => {
        if (err) {
            console.error('Błąd podczas usuwania pliku:', err);
            resoult = false;
        }
        else {
            resoult = true;
        }
    });
    return resoult;
};
exports.FileHelper = {
    checkIfFolderExist,
    createFolder,
    getFileExtension,
    removeFile,
    getAllFolders,
    getAllFilesWithDetails,
};
//# sourceMappingURL=file.helper.js.map