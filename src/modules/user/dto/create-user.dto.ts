import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto extends User {
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  first_name: string;

  @IsString()
  @MaxLength(300)
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @MaxLength(400)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(260)
  password: string;
}
