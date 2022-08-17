import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";

@Entity("role")
export class RoleEntity {
  @PrimaryColumn({ type: 'uuid'})
  id: number;

  @Column({ nullable: false })
  role: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
