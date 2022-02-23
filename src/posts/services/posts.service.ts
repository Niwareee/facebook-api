import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/services/prisma.service';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePostDto, authorId: string): Promise<{ post: Post }> {
    const post = await this.prisma.post.create({
      data: {
        ...dto,
        authorId,
      },
    });
    return { post };
  }

  async findOne(id: number): Promise<{ post: Post }> {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });
    return { post };
  }

  async findAll(): Promise<{ posts: Post[] }> {
    const posts = await this.prisma.post.findMany();
    return { posts };
  }

  async update(id: number, dto: UpdatePostDto): Promise<{ post: Post }> {
    const post = await this.prisma.post.update({
      where: { id },
      data: dto,
    });
    return { post };
  }

  async delete(id): Promise<Post> {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
