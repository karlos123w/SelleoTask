import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let cacheManager: { get: jest.Mock; set: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
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
      };

      const mockData = {
        id: '1',
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
      };
      jest.spyOn(service, 'signUp').mockResolvedValueOnce(mockData);

      const result = await controller.signUp(signUpDto);
      expect(result).toEqual(mockData);
    });
  });
});
