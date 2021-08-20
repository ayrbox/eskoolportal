import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Subject } from './Subject';
import { Class } from './Class';
import { FiscalYear } from './FiscalYear';
import { Exam } from './Exam';

@Entity('grades')
export class Grade extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => FiscalYear, (year) => year.id, { eager: true })
  year: FiscalYear;

  @ManyToOne(() => Exam, (exam) => exam.id, { eager: true })
  exam: Exam;

  @ManyToOne(() => Class, (clazz) => clazz.id, { eager: true })
  class: Class;

  @ManyToOne(() => Subject, (subject) => subject.id, { eager: true })
  subject: Subject;

  @Column({ type: 'varchar', length: 20 })
  gradeType: string;

  @Column({ type: 'decimal' })
  fullMark: number;

  @Column({ type: 'decimal' })
  passMark: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
