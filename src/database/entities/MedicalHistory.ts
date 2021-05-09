import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Student } from './Student';

@Entity('medical_history')
export class MedicalHistory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Student, (student) => student.id)
  student: Student;

  @Column({ type: 'varchar', length: 250 })
  description: string;

  @Column({ type: 'varchar', length: 20 })
  severity: string;

  @Column({ type: 'varchar', length: 200, name: 'triage_note' })
  triageNote: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
