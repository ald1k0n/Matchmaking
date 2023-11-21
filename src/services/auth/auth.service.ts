import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async createUser(data: Prisma.UserCreateInput) {
    const candidate = await this.prisma.user.findFirst({
      where: {
        nickname: data.nickname,
      },
    });

    if (candidate) throw new ForbiddenException('User already exists');

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: bcrypt.hashSync(data.password, 7),
      },
      select: {
        id: true,
        nickname: true,
      },
    });
    return user;
  }

  async authorize(data: Prisma.UserCreateInput) {
    const candidate = await this.prisma.user.findFirst({
      where: {
        nickname: data.nickname,
      },
    });

    if (!candidate) throw new UnauthorizedException('User not found');
    if (!bcrypt.compareSync(data.password, candidate.password))
      throw new UnauthorizedException("Password don't match");

    const access_key = await this.jwt.signAsync({ id: candidate.id });
    return access_key;
  }
}
