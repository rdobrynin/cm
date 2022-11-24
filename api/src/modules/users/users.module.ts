import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './users.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([UserModel]),
    forwardRef(() => AuthModule),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
