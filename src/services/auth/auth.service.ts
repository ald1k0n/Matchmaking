import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { DB_PROVIDERS } from 'src/constants';
import { User } from 'src/models';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DB_PROVIDERS.USER_MODEL) private readonly userModel: Model<User>,

    private readonly jwt: JwtService,
  ) {}

  async createUser(data: User) {
    const candidate = await this.userModel.findOne({ nickname: data.nickname });

    if (candidate) throw new ForbiddenException('User already exists');

    const user = await this.userModel.create({
      ...data,
      password: bcrypt.hashSync(data.password, 7),
    });

    return user;
  }

  async authorize(data: User) {
    const candidate = await this.userModel.findOne({ nickname: data.nickname });

    if (!candidate) throw new UnauthorizedException('User not found');
    if (!bcrypt.compareSync(data.password, candidate.password))
      throw new UnauthorizedException("Password don't match");

    const access_key = await this.jwt.signAsync({ id: candidate.id });
    return access_key;
  }
}
