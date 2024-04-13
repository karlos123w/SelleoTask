import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersModule } from './users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';

describe('UsersController', () => {
  let controller: UsersController;
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

  describe('SignUp', () => {
    it('Should sign Up an user', async () => {
      const signUpDto = {
        email: 'user@gmail.com',
        pass: 'password123',
        firstName: 'User 1',
        lastName: 'Wilkowski',
        phoneNumber: 123456789,
        shirtSize: 34,
        preferredTechnology: 'Node',
        role: 'user',
      };

      const mockData = {
        id: 1,
        firstName: 'User 1',
        email: 'user@gmail.com',
        hashedPass: '12sbdt38dy3',
        createdAt:
          'Wed Apr 10 2024 00:20:33 GMT+0200 (Central European Summer Time)',
        lastName: 'Wilkowski',
        phoneNumber: 123456789,
        shirtSize: 34,
        preferredTechnology: 'Node',
        token: '',
        role: 'user',
      };
      jest.spyOn(service, 'signUp').mockResolvedValueOnce(mockData);

      const result = await controller.signUp(signUpDto);
      expect(result).toEqual(mockData);
    });
  });

  describe('findAllUsers', () => {
    it('should return a array of the Users', async () => {
      const mockData = [
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
          role: 'user',
        },
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
      jest.spyOn(service, 'findAllUsers').mockResolvedValueOnce(mockData);

      const result = await controller.findAllUsers(mockedSignedUser.id);
      expect(result).toEqual(mockData);
    });
  });
});
