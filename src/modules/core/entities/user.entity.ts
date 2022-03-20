import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 30 })
  username: string;

  @Column("varchar", { length: 100 })
  email: string;

  @Column("varchar", { length: 64 })
  password: string;

  @Column({ nullable: true })
  email_verified_at: Date;

  @Column("varchar", { length: 64, default: "" })
  verification_token: string;

  @Column({ default: true })
  is_active: boolean;

  @Column("varchar", { length: 100 })
  role: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @DeleteDateColumn()
  delete_at: Date;
}
