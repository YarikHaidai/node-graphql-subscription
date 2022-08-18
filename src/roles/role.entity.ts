import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('role')
export class RoleEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ nullable: false })
  name: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
