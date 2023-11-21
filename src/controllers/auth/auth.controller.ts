import { Body, Controller, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('/')
  async createUser(@Body() body: Prisma.UserCreateInput) {
    return await this.auth.createUser(body);
  }

  @Post('/login')
  async authorize(@Body() body: Prisma.UserCreateInput) {
    return await this.auth.authorize(body);
  }
}
