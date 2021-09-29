import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Exam } from "./Exam";
import { Subject } from "./Subject";

@Entity("exam_settings")
export class ExamSettings extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Exam, (exam) => exam.id, { eager: true })
  exam: Exam;

  @ManyToOne(() => Subject, (subject) => subject.id, { eager: true })
  subject: Subject;

  @Column({ type: "varchar", length: 50, nullable: true })
  examType: string;

  @Column({ type: "decimal" })
  fullMark: number;

  @Column({ type: "decimal" })
  passMark: number;

  @CreateDateColumn()
  createdAt: Date;
}
