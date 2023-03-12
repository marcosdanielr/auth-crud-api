import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Response } from 'express';
import { PrismaService } from 'src/providers/database/prisma.service';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) { }

  async create(res: Response, createPostDto: CreatePostDto, user_id: string) {
    await this.prisma.post.create({
      data: {
        ...createPostDto,
        user_id
      }
    })
    res.status(HttpStatus.CREATED).send({ message: "Post created!" });
  }

  findAll(user_id: string) {
    return this.prisma.post.findMany({
      where: {
        user_id
      }
    })
  }

  async findOne(id: string, user_id: string) {
    const postExists = await this.prisma.post.findFirst({
      where: {
        id,
        user_id
      }
    })

    if (!postExists) {
      throw new HttpException({ message: 'Post not exists' }, HttpStatus.NO_CONTENT);
    }

    return postExists;

  }

  async update(res: Response, id: string, user_id: string, updatePostDto: UpdatePostDto) {
    const postExists = await this.prisma.post.findFirst({
      where: {
        id,
        user_id
      }
    })

    if (!postExists) {
      throw new HttpException({ message: 'Post not exists' }, HttpStatus.BAD_REQUEST);
    }

    await this.prisma.post.update({
      where: {
        id
      },
      data: updatePostDto
    })

    res.status(HttpStatus.OK).send({ message: "Post updated!" });
  }

  async delete(res: Response, id: string, user_id: string) {
    const postExists = await this.prisma.post.findFirst({
      where: {
        id,
        user_id
      }
    })

    if (!postExists) {
      throw new HttpException({ message: 'Post not exists' }, HttpStatus.BAD_REQUEST);
    }

    await this.prisma.post.delete({
      where: {
        id
      }
    })

    res.status(HttpStatus.OK).send({ message: "Post deleted!" });
  }

}
