import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/models';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('/')
  async createUser(@Body() body: User) {
    return await this.auth.createUser(body);
  }

  @Post('/login')
  async authorize(@Body() body: User) {
    return await this.auth.authorize(body);
  }
}
