import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Subject } from './Subject';
import { Class } from './Class';
import { FiscalYear } from './FiscalYear';
import { Exam } from './Exam';

@Entity('grades')
export class Grade extends BaseEntity {
  @ManyToOne(() => FiscalYear, (year) => year.id, { primary: true })
  year: FiscalYear;

  @ManyToOne(() => Exam, (exam) => exam.id, { primary: true })
  exam: Exam;

  @ManyToOne(() => Class, (clazz) => clazz.id, { primary: true })
  class: Class;

  @ManyToOne(() => Subject, (subject) => subject.id, { primary: true })
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
