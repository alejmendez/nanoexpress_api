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

  @Column({ name: "email_verified_at", nullable: true })
  emailVerifiedAt: Date;

  @Column("varchar", { name: "verification_token", length: 64 })
  verificationToken: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: "varchar", length: 100 })
  role: string;

  @CreateDateColumn({
    name: "create_at",
  })
  createAt: Date;

  @UpdateDateColumn({
    name: "update_at",
  })
  updateAt: Date;

  @DeleteDateColumn({
    name: "delete_at",
  })
  deleteAt: Date;
}
