import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Res,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { User } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post('create')
  create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    return this.userService.create(res, createUserDto);
  }

  @ApiBearerAuth('access-token')
  @Get('get-me')
  getMe(@Res() res: Response, @CurrentUser() user: User) {
    return this.userService.getMe(res, user.id);
  }

  @ApiBearerAuth('access-token')
  @Patch('update-me')
  update(
    @Res() res: Response,
    @Body() data: UpdateUserDto,
    @CurrentUser() user: User,
  ) {
    return this.userService.updateMe(res, data, user.id);
  }

  @ApiBearerAuth('access-token')
  @Delete('delete-me')
  remove(@Res() res: Response, @CurrentUser() user: User) {
    return this.userService.deleteMe(res, user.id);
  }
}
