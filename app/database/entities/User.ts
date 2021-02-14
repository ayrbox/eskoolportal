import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ type: 'varchar', length: 200 })
  name!: string;

  @Column({ type: 'varchar', length: 250 })
  email!: string;

  @Column({ type: 'varchar', length: 256 })
  password!: string;

  @Column({ type: 'varchar', length: 1000 })
  avatar!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
