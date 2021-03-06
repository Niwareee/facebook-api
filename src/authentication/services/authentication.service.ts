import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../../users/services/users.service';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}

  async login({ email, password }: LoginDto): Promise<User>{
    const user = await this.usersService.findUnique({ email });
    if (!user || user.password !== password) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  register(dto: RegisterDto): Promise<{user: User}> {
    return this.usersService.create(dto.email, dto.password);
  }

  generateAccessToken(user: User): string {
    const payload = { id: user.id };

    return jwt.sign(payload, process.env.JWT_SECRET);
  }
}
