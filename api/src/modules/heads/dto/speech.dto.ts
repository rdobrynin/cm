import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SpeechDto {
  @ApiProperty({ example: 'user id', description: 'id' })
  readonly id: number;

  @ApiProperty({ example: 'Here should be variable name for video speech', description: 'name' })
  @IsString({ message: 'Should be string' })
  readonly name: string;
}
