import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(300)
  first_name: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(300)
  last_name: string;

  @IsEmail()
  @MaxLength(400)
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(260)
  password: string;
}

