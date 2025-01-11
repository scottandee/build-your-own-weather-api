import { AccountType } from "../entities/user.entity";

export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  accountType: AccountType;
  country: string;
  countryCode: string;
  state: string;
  address: string;
  phoneNumber: string;
}
