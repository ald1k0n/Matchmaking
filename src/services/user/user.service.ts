import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getMe(id: number) {
    return await this.prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        nickname: true,
      },
    });
  }
}