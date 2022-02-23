import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { User } from '@prisma/client';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto): Promise<{ user: User; token: string }> {
    const user = await this.authenticationService.login(dto);
    return {
      user,
      token: this.authenticationService.generateAccessToken(user),
    };
  }

  @Post('register')
  register(@Body() dto: RegisterDto): Promise<User> {
    return this.authenticationService.register(dto);
  }
}
