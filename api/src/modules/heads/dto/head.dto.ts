import { ApiProperty } from '@nestjs/swagger';
import {HeadModel} from "../head.model";

export class HeadDto {
  @ApiProperty({ example: '1', description: 'User ID' })
  id: number;

  @ApiProperty({ example: 'https://s3-eu-west-1.amazonaws.com/soccomm-videos-staging-output/0ab0c9e1-1233-4b0c-9200-82da7f67b76d.mp4', description: 'Video url' })
  videoUrl: string;

  public static toDto(entity: HeadModel): HeadDto {
    return {
      id: entity.id,
      videoUrl: entity.videoUrl,
    };
  }
}
