import { ApiOperation } from '@nestjs/swagger';

export const CreateUserApiOperation = (description: string) =>
  function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({ summary: description })(target, propertyKey, descriptor);
  };

export const FilesCreateFolder = CreateUserApiOperation(
  '"Create Directory" - only for admins',
);

export const FilesAddFile = CreateUserApiOperation(
  '"Add File to Directory" - The admin directory is secured only for admins',
);

export const FilesFindAllFolder = CreateUserApiOperation(
  '"Find all Directories" - The admin directory is secured only for admins',
);

export const FilesFindAllFiles = CreateUserApiOperation(
  '"Find all Files" - The admin directory is secured only for admins',
);

export const FilesDisplayContent = CreateUserApiOperation(
  '"Display Content of Files" - The admin directory is secured only for admins',
);
