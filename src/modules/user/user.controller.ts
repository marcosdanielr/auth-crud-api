import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { User } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @IsPublic()
  @Post('create')
  create(res: Response, @Body() createUserDto: CreateUserDto) {
    return this.userService.create(res, createUserDto);
  }

  @Get('get-me')
  getMe(@CurrentUser() user: User) {
    return user;
  }

  @Patch('update-me')
  update(res: Response, @Body() data: UpdateUserDto, @CurrentUser() user: User) {
    return this.userService.updateMe(res, data, user.id);
  }

  @Delete('delete-me')
  remove(res: Response, @CurrentUser() user: User) {
    return this.userService.deleteMe(res, user.id);
  }
}
