import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  DeleteDateColumn,
} from 'typeorm';
import { Student } from './Student';
import { Subject } from './Subject';

@Entity('classes')
export class Class extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 200 })
  name!: string;

  @Column({ type: 'int' })
  order!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Student, (student) => student.class)
  students!: Promise<Student[]>;

  @ManyToMany(() => Subject, (_) => _.classes)
  @JoinTable()
  subjects: Subject[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
