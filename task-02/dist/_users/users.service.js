"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("./entities/users.entity");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
        this.jwtSecretKey = process.env.AUTH_SECRET;
    }
    async signUp(signUpDto) {
        const newDate = new Date().toString();
        const foundUser = await this.userModel.findOne({
            where: { email: signUpDto.email },
        });
        if (foundUser)
            throw new common_1.ConflictException(`User with that email already exist`);
        const hashedPassword = await this.hashPassword(signUpDto.pass);
        const registeredUser = this.userModel.create({
            ...signUpDto,
            createdAt: newDate,
            hashedPass: hashedPassword,
        });
        console.log(process.env.AUTH_SECRET);
        const token = await this.generateJwtToken(registeredUser.id, registeredUser.firstName);
        await this.userModel.save(registeredUser);
        return {
            ...registeredUser,
            token,
        };
    }
    async findAllUsers(signedUser) {
        await this.findUserById(signedUser);
        const foundAllUsers = await this.userModel.find();
        if (!foundAllUsers)
            return [];
        return foundAllUsers;
    }
    async findUserById(userId) {
        const foundUser = await this.userModel.findOne({ where: { id: userId } });
        if (!foundUser)
            throw new common_1.NotFoundException(`User not found`);
        return foundUser;
    }
    async findUserByEmail(email) {
        const user = await this.userModel.findOne({ where: { email: email } });
        if (!user)
            throw new common_1.NotFoundException(`User with that email not found`);
        return user;
    }
    async findAdmin(userId) {
        const foundAdmin = await this.userModel.findOne({
            where: {
                id: userId,
                role: 'admin',
            },
        });
        if (!foundAdmin)
            throw new common_1.ForbiddenException('To execute this command you must have the admin role');
        console.log('admin zanaleziony');
        return foundAdmin;
    }
    async comparePasswords(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
    async generateJwtToken(userId, firstName) {
        const expiresIn = '1d';
        return jwt.sign({ sub: userId, firstName }, this.jwtSecretKey, {
            expiresIn,
        });
    }
    async hashPassword(password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
    async refreshAuthToken(userId) {
        try {
            const user = await this.userModel.findOne({ where: { id: userId } });
            if (!user)
                return null;
            const expiresIn = '1d';
            const token = jwt.sign({ sub: user.id, firstName: user.firstName }, this.jwtSecretKey, { expiresIn });
            return token;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Błąd w momencie odświeżania tokenu -(prawdopodobnie źle podane id)`);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map