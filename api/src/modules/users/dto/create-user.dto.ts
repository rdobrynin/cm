import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'roman@cm.com', description: 'User email' })
  @IsString({ message: 'Should be string' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;

  @ApiProperty({ example: '123456', description: 'User password' })
  @IsString({ message: 'Should be string' })
  @Length(4, 16, { message: 'Should be between 4 and 16 symbols0' })
  readonly password: string;
}
