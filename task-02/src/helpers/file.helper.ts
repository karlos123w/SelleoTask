import * as fs from 'fs-extra';

const checkIfFolderExist = (path: string) => {
  return fs.existsSync(path);
};

const createFolder = (path: string) => {
  fs.mkdir(path, { recursive: true });
};

const getFileExtension = (
  file: Express.Multer.File,
  extensionOnError?: string,
): string => {
  if (!file.originalname) return extensionOnError;
  const value = file.originalname.split('.')[1];
  return value;
};

const getAllFolders = async (path: string): Promise<string[]> => {
  const folders: string[] = [];

  try {
    const entries = await fs.readdir(path, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const subPath = `${path}/${entry.name}`;
        folders.push(subPath);
        const subFolders = await getAllFolders(subPath);
        folders.push(...subFolders);
      }
    }
  } catch (error) {
    console.error('Error reading directory:', error);
  }

  return folders;
};

const removeFile = (path: string): boolean => {
  let resoult = true;

  fs.unlink(path, (err) => {
    if (err) {
      console.error('Błąd podczas usuwania pliku:', err);
      resoult = false;
    } else {
      resoult = true;
    }
  });

  return resoult;
};

export const FileHelper = {
  checkIfFolderExist,
  createFolder,
  getFileExtension,
  removeFile,
  getAllFolders,
};
