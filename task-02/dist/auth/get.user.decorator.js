"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = void 0;
const common_1 = require("@nestjs/common");
exports.GetUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const newUserData = {
        id: request.user.sub,
        expiration: request.user.exp,
    };
    return newUserData;
});
//# sourceMappingURL=get.user.decorator.js.map