import { UsersService } from 'src/_users/users.service';
import { SignInDto } from './dtos/sign.in.dto';
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    Ū: any;
    signIn(signInDto: SignInDto): Promise<{
        token: string;
        id: string;
        firstName: string;
        lastName: string;
        phoneNumber: number;
        shirtSize: number;
        preferredTechnology: string;
        createdAt: string;
        email: string;
        hashedPass: string;
    }>;
    refreshAuthToken(userId: string): Promise<string>;
}
