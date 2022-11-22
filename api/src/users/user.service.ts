import { Injectable } from '@nestjs/common';
import { UserModel } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private usersRepository: Repository<UserModel>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserDto> {
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.usersRepository.save({
      ...dto,
      password: hashPassword,
    });
    return UserDto.toDto(user);
  }

  async getUserByEmail(email: string): Promise<UserModel> {
    return await this.usersRepository.findOne({ where: { email } });
  }
}
