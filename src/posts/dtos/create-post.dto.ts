import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  authorId: string;
}