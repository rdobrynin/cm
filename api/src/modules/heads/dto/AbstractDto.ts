import { ApiProperty } from '@nestjs/swagger';
import {IAbstractEntity} from "../interfaces/abstract.entity";


export class AbstractDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(entity: IAbstractEntity<AbstractDto>) {
    if (!entity) {
      return;
    }

    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
