import { UserModel } from '../users.model';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: '1', description: 'User ID' })
  id: number;

  @ApiProperty({ example: 'roman@cm.com', description: 'User email' })
  email: string;

  public static toDto(entity: UserModel): UserDto {
    return {
      id: entity.id,
      email: entity.email,
    };
  }
}
