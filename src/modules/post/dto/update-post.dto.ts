import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty()
  @IsString()
  @MaxLength(240)
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsString()
  @MaxLength(240)
  @IsOptional()
  description: string;

  user_id: string;
}
