import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../_users/users.module';
import { Users } from '../_users/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
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
      controllers: [AuthController],
      providers: [
        AuthService,
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

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    cacheManager = module.get('CACHE_MANAGER') as any;
  });

  describe('SignIn', () => {
    it('Should sign in user', async () => {
      const signInDto = {
        email: 'user@gmail.com',
        pass: 'password123',
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
      jest.spyOn(service, 'signIn').mockResolvedValueOnce(mockData);

      const result = await controller.signIn(signInDto);
      expect(result).toEqual(mockData);
    });
  });
});
