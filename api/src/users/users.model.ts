import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserInterface } from './interfaces/user-interface';

@Entity({ name: 'users' })
export class UserModel implements UserInterface {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
