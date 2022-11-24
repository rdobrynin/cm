import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {SharedModule} from "./modules/shared/shared.module";
import {HeadModule} from "./modules/heads/head.module";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.${process.env.NODE_ENV}.env`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'postgres',
        host: 'postgres',
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        synchronize: true,
        entities: ['dist/**/*.model.js'],
        migrations: ['dist/migrations/**/*.js'],
        subscribers: ['dist/subscriber/**/*.js'],
        cli: {
          migrationsDir: 'src/migrations',
          subscribersDir: 'src/subscriber',
        },
      }),
    }),
    UsersModule,
    AuthModule,
    SharedModule,
    HeadModule,
  ],
})
export class AppModule {}
