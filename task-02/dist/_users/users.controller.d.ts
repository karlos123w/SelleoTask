import { UsersService } from './users.service';
import { SignUpDto } from './dtos/sing.up.dto';
import { SignedUser } from '../auth/user.interface';
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
    findAllUsers(signedUser: SignedUser): Promise<import("./entities/users.entity").Users[]>;
}
