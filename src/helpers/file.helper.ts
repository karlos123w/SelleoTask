import * as fs from 'fs-extra';

const checkIfFolderExist = (path: string) => {
  return fs.existsSync(path);
};

const createFolder = (path: string) => {
  fs.mkdir(path, { recursive: true });
};

interface FileDetails {
  name: string;
  size: number;
}

const getFileExtension = (
  file: Express.Multer.File,
  extensionOnError?: string,
): string => {
  if (!file.originalname) return extensionOnError;
  const value = file.originalname.split('.')[1];
  return value;
};
const getAllFolders = async (
  path: string,
  isAdmin: boolean,
): Promise<string[]> => {
  const folders: string[] = [];

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
  } catch (error) {
    console.error('Error reading directory:', error);
  }

  return folders;
};

const getAllFilesWithDetails = async (path: string): Promise<FileDetails[]> => {
  const files: FileDetails[] = [];

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
      } else if (entry.isDirectory()) {
        const subPath = `${path}/${entry.name}`;
        const subFiles = await getAllFilesWithDetails(subPath);
        files.push(
          ...subFiles.map((file) => ({
            ...file,
            name: `${entry.name}/${file.name}`,
          })),
        );
      }
    }
  } catch (error) {
    console.error('Error reading directory:', error);
  }

  return files;
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
  getAllFilesWithDetails,
};
