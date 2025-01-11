import { IsEmail, IsNotEmpty } from "class-validator";
import { AccountType } from "src/users/entities/user.entity";

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEmail()
  password: string;
  name: string;
  accountType: AccountType;
  country: string;
  countryCode: string;
  state: string;
  address: string;
  phoneNumber: string;
}