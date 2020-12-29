import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Class } from './Class';
import { Section } from './Section';

@Entity('students')
export class Student extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ type: 'varchar', length: 200 })
  name!: string;

  @Column({ type: 'date' })
  dateOfBirth!: Date;

  @Column({ type: 'enum', enum: ['male', 'female'] })
  gender!: string;

  @Column({ type: 'varchar', length: 500 })
  address!: string;

  @Column({ type: 'varchar', length: 500 })
  contactNo!: string;

  @Column({ type: 'varchar', length: 500 })
  email!: string;

  @Column({ type: 'date', nullable: true })
  joinDate!: Date;

  @Column({ type: 'int', nullable: true })
  rollno!: number;

  @Column({ type: 'varchar', length: 10 })
  referenceCode!: string;

  // Student.belongsTo(models.Class, { foreignKey: "classId", as: "class" });

  @Column()
  classId!: string;

  @ManyToOne(() => Class, (cls) => cls.students, { eager: true })
  class!: Class;

  @Column()
  sectionId!: string;

  @ManyToOne(() => Section, (section) => section.students, { eager: true })
  section!: Section;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
