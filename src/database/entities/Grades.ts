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

  @ManyToOne(() => FiscalYear, (year) => year.id)
  year: FiscalYear;

  @ManyToOne(() => Exam, (exam) => exam.id)
  exam: Exam;

  @ManyToOne(() => Class, (clazz) => clazz.id)
  class: Class;

  @ManyToOne(() => Subject, (subject) => subject.id)
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
