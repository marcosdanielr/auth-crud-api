import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(300)
  @ApiProperty()
  first_name: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(300)
  @ApiProperty()
  last_name: string;

  @IsEmail()
  @MaxLength(400)
  @IsOptional()
  @ApiProperty()
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(260)
  @ApiProperty()
  password: string;
}

