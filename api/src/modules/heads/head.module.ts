import {forwardRef, Module} from '@nestjs/common';
import { HeadService } from "./head.service";
import { HeadController } from "./head.controller";
import {ConfigModule} from "@nestjs/config";
import {HttpModule} from "@nestjs/axios";
import {JwtService} from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {HeadModel} from "./head.model";

@Module({
    controllers: [HeadController],
    imports: [
        TypeOrmModule.forFeature([HeadModel]),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        forwardRef(() => HttpModule),
        forwardRef(() => UsersModule),
    ],
    providers: [HeadService, JwtService],
    exports: [HeadService],
})
export class HeadModule {}
