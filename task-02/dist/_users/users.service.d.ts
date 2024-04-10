import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { SignUpDto } from 'src/_users/dtos/sing.up.dto';
export declare class UsersService {
    private userModel;
    private readonly jwtSecretKey;
    constructor(userModel: Repository<Users>);
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
        role: string;
    }>;
    findAllUsers(signedUser: string): Promise<Users[]>;
    findUserById(userId: string): Promise<Users>;
    findUserByEmail(email: string): Promise<Users>;
    findAdmin(userId: string): Promise<Users>;
    comparePasswords(password: string, hashedPassword: string): Promise<boolean>;
    generateJwtToken(userId: string, firstName: string): Promise<string>;
    hashPassword(password: string): Promise<string>;
    refreshAuthToken(userId: string): Promise<string | null>;
}
