import { SignInDto } from './dtos/sign.in.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
}
