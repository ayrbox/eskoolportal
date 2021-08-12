import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Class } from './Class';
import { Exam } from './Exam';
import { FiscalYear } from './FiscalYear';
import { Student } from './Student';
import { Subject } from './Subject';

@Entity('students_grade')
export class StudentGrade extends BaseEntity {
  @ManyToOne(() => Student, (student) => student.id, { primary: true })
  student: Student;

  @ManyToOne(() => FiscalYear, (year) => year.id, { primary: true })
  year: FiscalYear;

  @ManyToOne(() => Exam, (exam) => exam.id, { primary: true })
  exam: Exam;

  @ManyToOne(() => Class, (clazz) => clazz.id, { primary: true })
  class: Class;

  @ManyToOne(() => Subject, (subject) => subject.id, { primary: true })
  subject: Subject;

  @Column({ type: 'decimal' })
  fullMark: number;

  @Column({ type: 'decimal' })
  passMark: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
