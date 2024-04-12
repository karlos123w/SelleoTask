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
exports.TrebuchetController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const trebuchet_service_1 = require("./trebuchet.service");
const text_dto_1 = require("./dtos/text.dto");
let TrebuchetController = class TrebuchetController {
    constructor(trebuchetService) {
        this.trebuchetService = trebuchetService;
    }
    async findTrebuchetAmount(textDto) {
        return await this.trebuchetService.findTrebuchetAmount(textDto);
    }
};
exports.TrebuchetController = TrebuchetController;
__decorate([
    (0, common_1.Post)('find-amount'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [text_dto_1.TextDto]),
    __metadata("design:returntype", Promise)
], TrebuchetController.prototype, "findTrebuchetAmount", null);
exports.TrebuchetController = TrebuchetController = __decorate([
    (0, common_1.Controller)('trebuchet'),
    (0, swagger_1.ApiTags)('Trebuchet'),
    __metadata("design:paramtypes", [trebuchet_service_1.TrebuchetService])
], TrebuchetController);
//# sourceMappingURL=trebuchet.controller.js.map