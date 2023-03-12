import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @MaxLength(240)
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @MaxLength(240)
  @IsNotEmpty()
  description: string;

  user_id: string;
}
