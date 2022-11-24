import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({
    type: UserDto,
    description: 'Create new user',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('/user')
  async createUser(@Body() userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
    }

    return await this.userService.createUser(userDto);
  }
}
