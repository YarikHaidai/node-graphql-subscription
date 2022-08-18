import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from '../roles/role.entity';

@Entity('user')
export class UserEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ unique: true })
  phone: string;

  @ManyToMany(() => RoleEntity, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: RoleEntity[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
