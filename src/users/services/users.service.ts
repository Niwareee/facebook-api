import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../database/services/prisma.service';
import {UpdateProfileDto} from "../dtos/update-profile.dto";
import {Prisma} from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findUnique(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({ where });
  }

  create(data) {
    return this.prisma.user.create({ data });
  }

  findAllPosts(id: string) {
    return this.prisma.post.findMany({
      where: {
        authorId: id
      }
    });
  }

  findProfile(id: string) {
    return this.prisma.profile.findUnique({
      where: {
        userId: id
      }
    });
  }

  updateProfile(id: string, data: UpdateProfileDto) {
    return this.prisma.profile.update({
      where: {
        userId: id
      },
      data
    });
  }
}
