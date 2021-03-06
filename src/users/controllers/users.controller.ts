import { Body, Controller, Get, Param, UseGuards, Patch } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { JwtGuard } from '../../authentication/guards/jwt.guard';
import { Post, Profile } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('/users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id/posts')
  findAllPosts(@Param('id') id: string): Promise<{posts: Post[]}> {
    return this.usersService.findAllPosts(id);
  }

  @Get(':id/profile')
  findProfile(@Param('id') id: string): Promise<{profile: Profile}> {
    return this.usersService.findProfile(id);
  }

  @Patch(':id/profile')
  updateProfile(
    @Param('id') id: string,
    @Body() data: UpdateProfileDto,
  ): Promise<{profile: Profile}> {
    return this.usersService.updateProfile(id, data);
  }
}
