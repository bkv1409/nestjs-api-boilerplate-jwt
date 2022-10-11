import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Status } from '../../tasks/enums/status.enum';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ length: 60 })
  password: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.disabled
  })
  status: Status[];
}
