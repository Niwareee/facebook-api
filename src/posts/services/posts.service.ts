import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/services/prisma.service';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreatePostDto, authorId: string): Promise<Post> {
    return this.prisma.post.create({
      data: {
        ...dto,
        authorId,
      },
    });
  }

  findOne(id: number): Promise<Post> {
    return this.prisma.post.findUnique({
      where: { id },
    });
  }

  findAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  update(id: number, dto: UpdatePostDto): Promise<Post> {
    return this.prisma.post.update({
      where: { id },
      data: dto,
    });
  }

  delete(id): void {
    this.prisma.post.delete({
      where: { id },
    });
  }
}
