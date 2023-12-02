import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DB_PROVIDERS } from 'src/constants';
import { Model } from 'mongoose';
import { User } from 'src/models';

@Injectable()
export class UserService {
  constructor(
    @Inject(DB_PROVIDERS.USER_MODEL) private readonly userModel: Model<User>,
  ) {}

  async getMe(id: string) {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
