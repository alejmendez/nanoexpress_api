import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("people")
export class Person {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 15 })
  dni: string;

  @Column("varchar", { length: 80 })
  first_name: string;

  @Column("varchar", { length: 80 })
  last_name: string;

  @Column("varchar", { length: 200 })
  avatar: string;

  @Column("date")
  birthday: Date;

  @Column("varchar", { length: 100 })
  room_telephone: string;

  @Column("varchar", { length: 100 })
  mobile_phone: string;

  @Column("varchar", { length: 250 })
  website: string;

  @Column("varchar", { length: 100 })
  languages: string;

  @Column("varchar", { length: 80 })
  email: string;

  @Column("varchar", { length: 80 })
  nationality: string;

  @Column("varchar", { length: 10 })
  gender: string;

  @Column("varchar", { length: 1 })
  civil_status: string;

  @Column("varchar", { length: 100 })
  contact_options: string;

  @Column("varchar", { length: 200 })
  address: string;

  @Column("varchar", { length: 200 })
  address_2: string;

  @Column("varchar", { length: 80 })
  postcode: string;

  @Column("varchar", { length: 80 })
  city: string;

  @Column("varchar", { length: 80 })
  state: string;

  @Column("varchar", { length: 80 })
  country: string;

  @Column("smallint")
  number_children: number;

  @Column("varchar", { length: 255 })
  observation: string;

  @Column("varchar", { length: 255 })
  about: string;

  @Column("varchar", { length: 5 })
  blood_type: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @DeleteDateColumn()
  delete_at: Date;
}
