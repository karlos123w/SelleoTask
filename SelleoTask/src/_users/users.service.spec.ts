import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../_users/users.module';
import { Users } from '../_users/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let cacheManager: { get: jest.Mock; set: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Users],
          synchronize: true,
        }),
      ],
      controllers: [UsersController],
      providers: [
        UsersModule,
        {
          provide: 'CACHE_MANAGER',
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    cacheManager = module.get('CACHE_MANAGER') as any;
  });

  describe('findAllUsers', () => {
    it('Should find all users', async () => {
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

      const mockedUsers = [
        {
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
        {
          id: 2,
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
      ];
      jest.spyOn(service, 'findAllUsers').mockResolvedValueOnce(mockedUsers);

      const result = await service.findAllUsers(mockedSignedUser.id.id);
      expect(result).toEqual(mockedUsers);
    });
  });
});
