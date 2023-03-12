import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(260)
  @ApiProperty()
  password: string;
}
