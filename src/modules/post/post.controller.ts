import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Response } from 'express';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('post')
@Controller('api/post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @ApiBearerAuth('access-token')
  @Post('create')
  create(@Res() res: Response, @Body() createPostDto: CreatePostDto, @CurrentUser() user: User) {
    return this.postService.create(res, createPostDto, user.id);
  }

  @ApiBearerAuth('access-token')
  @Get('all')
  findAll(@CurrentUser() user: User) {
    return this.postService.findAll(user.id);
  }

  @ApiBearerAuth('access-token')
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.postService.findOne(id, user.id);
  }

  @ApiBearerAuth('access-token')
  @Patch('update/:id')
  update(@Res() res: Response, @Param('id') id: string, @CurrentUser() user: User, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(res, id, user.id, updatePostDto);
  }

  @ApiBearerAuth('access-token')
  @Delete('delete/:id')
  remove(@Res() res: Response, @Param('id') id: string, @CurrentUser() user: User) {
    return this.postService.delete(res, id, user.id);
  }
}
