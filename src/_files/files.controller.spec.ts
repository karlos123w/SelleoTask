import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { FilesModule } from './files.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('FilesController', () => {
  let controller: FilesController;
  let service: FilesService;
  let cacheManager: { get: jest.Mock; set: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        FilesModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          synchronize: true,
        }),
      ],
      controllers: [FilesController],
      providers: [
        FilesModule,
        {
          provide: 'CACHE_MANAGER',
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FilesController>(FilesController);
    service = module.get<FilesService>(FilesService);
    cacheManager = module.get('CACHE_MANAGER') as any;
  });

  describe('CreateDirectory', () => {
    it('Should create a directory, only for admins', async () => {
      const dirname = 'dirTest';
      const mockedSignedUser = {
        id: {
          id: 1,
          firstName: 'User 1',
          email: 'jannko@wp.pl',
          hashedPass: '12sbdt38dy3',
          createdAt:
            'Wed Apr 10 2024 00:20:33 GMT+0200 (Central European Summer Time)',
          lastName: 'Wilkowski',
          phoneNumber: 123456789,
          shirtSize: 34,
          preferredTechnology: 'Node',
          token: '',
          expiration: 1,
          role: 'user',
        },
      };

      jest
        .spyOn(service, 'createDirectory')
        .mockImplementation(async () => ({ message: 'Directory created' }));

      const result = await controller.createDirectory(
        dirname,
        mockedSignedUser.id,
      );

      expect(result).toEqual({ message: 'Directory created' });
    });
  });

  describe('FindAllDirectiories', () => {
    it('Should find all Directories, except /admin if user is not an admin', async () => {
      const mockDirectories = [
        './uploads/Server compiled',
        './uploads/Wakajki',
        './uploads/admin',
        './uploads/test',
        './uploads/video',
      ];

      const mockedSignedUser = {
        id: {
          id: 1,
          firstName: 'User 1',
          email: 'jannko@wp.pl',
          hashedPass: '12sbdt38dy3',
          createdAt:
            'Wed Apr 10 2024 00:20:33 GMT+0200 (Central European Summer Time)',
          lastName: 'Wilkowski',
          phoneNumber: 123456789,
          shirtSize: 34,
          preferredTechnology: 'Node',
          token: '',
          expiration: 1,
          role: 'user',
        },
      };

      jest
        .spyOn(service, 'findAllDirectories')
        .mockResolvedValue(mockDirectories);

      const result = await controller.findAllDirectories(mockedSignedUser.id);

      expect(result).toEqual(mockDirectories);
    });
  });
});
