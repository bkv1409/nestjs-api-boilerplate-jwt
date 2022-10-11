import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column('int')
  priority: number;

  @Column()
  status: boolean;

  @Column('int')
  viewsCount: number;

  @CreateDateColumn({ type : 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({ type : 'timestamp'})
  updatedAt: Date;
}
