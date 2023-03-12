import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsString()
  @MaxLength(240)
  @IsOptional()
  title: string;

  @IsString()
  @MaxLength(240)
  @IsOptional()
  description: string;

  user_id: string;
}
