import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import {CreatePostDto} from "../dtos/create-post.dto";
import {UpdatePostDto} from "../dtos/update-post.dto";
import {JwtGuard} from "../../authentication/guards/jwt.guard";

@UseGuards(JwtGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() dto: CreatePostDto) {
    return this.postsService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(Number(id));
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdatePostDto) {
    return this.postsService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postsService.delete(Number(id));
  }
}