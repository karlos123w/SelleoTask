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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeOrm_1 = require("typeOrm");
let Users = class Users {
};
exports.Users = Users;
__decorate([
    (0, typeOrm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({ description: 'Users id' }),
    __metadata("design:type", String)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeOrm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Users first name' }),
    __metadata("design:type", String)
], Users.prototype, "firstName", void 0);
__decorate([
    (0, typeOrm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Users last name' }),
    __metadata("design:type", String)
], Users.prototype, "lastName", void 0);
__decorate([
    (0, typeOrm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Users phone number' }),
    __metadata("design:type", Number)
], Users.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeOrm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Users shirt size' }),
    __metadata("design:type", Number)
], Users.prototype, "shirtSize", void 0);
__decorate([
    (0, typeOrm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Users preffered technology' }),
    __metadata("design:type", String)
], Users.prototype, "preferredTechnology", void 0);
__decorate([
    (0, typeOrm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'date of creation of the user account  ' }),
    __metadata("design:type", String)
], Users.prototype, "createdAt", void 0);
__decorate([
    (0, typeOrm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Users email' }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeOrm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Users hashed password' }),
    __metadata("design:type", String)
], Users.prototype, "hashedPass", void 0);
exports.Users = Users = __decorate([
    (0, typeOrm_1.Entity)()
], Users);
//# sourceMappingURL=users.entity.js.map