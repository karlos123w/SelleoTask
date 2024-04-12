import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { SignUpDto } from 'src/_users/dtos/sing.up.dto';
export declare class UsersService {
    private userModel;
    private readonly jwtSecretKey;
    constructor(userModel: Repository<Users>);
    signUp(signUpDto: SignUpDto): Promise<{
        token: string;
        id: number;
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
    findAllUsers(signedUser: number): Promise<Users[]>;
    findUserById(userId: number): Promise<Users>;
    findUserByEmail(email: string): Promise<Users>;
    findAdmin(userId: number): Promise<Users>;
    isAdmin(userId: number): Promise<boolean>;
    comparePasswords(password: string, hashedPassword: string): Promise<boolean>;
    generateJwtToken(userId: number, firstName: string): Promise<string>;
    hashPassword(password: string): Promise<string>;
    refreshAuthToken(userId: number): Promise<string | null>;
}
