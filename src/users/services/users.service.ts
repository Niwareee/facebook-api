import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/services/prisma.service';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { Prisma, Post, Profile, User } from '@prisma/client';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findUnique(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.findUnique({ where });
  }

  create(dto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...dto,
        Profile: { create: { firstName: '', lastName: '' } },
      },
    });
  }

  findAllPosts(id: string): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        authorId: id,
      },
    });
  }

  findProfile(id: string): Promise<Profile> {
    return this.prisma.profile.findUnique({
      where: {
        userId: id,
      },
    });
  }

  updateProfile(id: string, dto: UpdateProfileDto): Promise<Profile> {
    return this.prisma.profile.update({
      where: {
        userId: id,
      },
      data: dto,
    });
  }
}
