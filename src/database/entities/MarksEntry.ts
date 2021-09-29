import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Student } from "./Student";
import { FiscalYear } from "./FiscalYear";
import { Exam } from "./Exam";
import { Class } from "./Class";
import { Subject } from "./Subject";

@Entity("marks_entry")
export class MedicalHistory extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => FiscalYear, (year) => year.id)
  year: FiscalYear;

  @ManyToOne(() => Exam, (exam) => exam.id)
  exam: Exam;

  @ManyToOne(() => Class, (clazz) => clazz.id)
  class: Class;

  @ManyToOne(() => Subject, (subject) => subject.id)
  subject: Subject;

  @ManyToOne(() => Student, (student) => student.id)
  student: Student;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
