import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePostDto {
  @IsString()
  @MaxLength(240)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MaxLength(240)
  @IsNotEmpty()
  description: string;

  user_id: string;
}
