import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { HeadInterface } from './interfaces/head-interface';

@Entity({ name: 'heads' })
export class HeadModel implements HeadInterface {
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column()
    userId: number;

    @Column()
    videoUrl: string;
}
