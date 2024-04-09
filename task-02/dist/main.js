"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const fs = require("fs");
const auth_middleware_1 = require("./auth/auth.middleware");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_setup_1 = require("./swagger.setup");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const packageJson = fs.readFileSync(`package.json`, `utf8`);
    const version = JSON.parse(packageJson).version;
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT') || 3005;
    (0, swagger_setup_1.setupSwagger)(app);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    app.enableCors();
    await app.listen(port, async () => {
        console.log(`server version on ${port}: ${version}`);
    });
    app.use(auth_middleware_1.AuthMiddleware);
}
bootstrap();
//# sourceMappingURL=main.js.map