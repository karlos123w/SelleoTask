import { UsersService } from './users.service';
import { SignUpDto } from './dtos/sing.up.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    signUp(signUpDto: SignUpDto): Promise<{
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
