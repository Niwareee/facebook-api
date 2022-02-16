import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [AuthenticationModule, UsersModule, PostsModule],
})

export class AppModule {}
