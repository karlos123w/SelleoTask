import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './_users/users.module';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './_files/files.module';
import { TrebuchetModule } from './trebuchet/trebuchet.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    FilesModule,
    TrebuchetModule,
  ],
})
export class AppModule {}
