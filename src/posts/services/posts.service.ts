import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/services/prisma.service';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { CreatePostDto } from '../dtos/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreatePostDto) {
    return this.prisma.post.create({
      data: dto
    });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: {id}
    });
  }

  findAll() {
    return this.prisma.post.findMany();
  }

  update(id: number, data: UpdatePostDto) {
    return this.prisma.post.update({
      where: {id},
      data
    });
  }

  delete(id) {
    return this.prisma.post.delete({
      where: {id}
    });
  }
}
