import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guards';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import {UserDto} from "../users/dto/user.dto";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({
    type: LoginResponseDto,
    description: 'Login',
  })
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() loginDto: LoginRequestDto) {
    return this.authService.login(loginDto);
  }

  @ApiOkResponse({
    type: UserDto,
    description: 'Current user',
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  user(@Request() req) {
    return req.user;
  }
}
