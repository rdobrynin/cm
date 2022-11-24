import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import type { AbstractDto } from '../dto/AbstractDto';
import {Constructor} from "./types";

/**
 * @deprecated
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GetConstructorArgs<T> = T extends new (...args: infer U) => any
  ? U
  : never;

export interface IAbstractEntity<DTO extends AbstractDto, O = never> {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  /**
   * deprecated GetConstructorArgs<T>[1] use only [O]
   * @param {GetConstructorArgs<T>[1] | O} options
   * @returns {DTO}
   */
  toDto<T>(options?: O | GetConstructorArgs<T>[1]): DTO;
}

export abstract class AbstractEntity<
  DTO extends AbstractDto = AbstractDto,
  O = never,
> implements IAbstractEntity<DTO, O>
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  private dtoClass: Constructor<DTO>;

  toDto<T>(options?: O | GetConstructorArgs<T>[1]): DTO {
    const dtoClass = this.dtoClass;

    if (!dtoClass) {
      throw new Error(
        `You need to use @UseDto on class (${this.constructor.name}) be able to call toDto function`,
      );
    }

    return new this.dtoClass(this, options);
  }
}
