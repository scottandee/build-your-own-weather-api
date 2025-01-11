import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum AccountType {
  FREELANCER = 'Freelancer',
  COMPANY = 'Company'
}

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  name: string

  @Column({ type: 'text', default: AccountType.FREELANCER})
  accountType: AccountType;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  countryCode: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phoneNumber: string;
}
