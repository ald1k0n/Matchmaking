import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user/user.controller';
import { UserService } from 'src/services/user/user.service';
import { userProvider } from 'src/models';
import { MongoModule } from '../mongo/mongo.module';

@Module({
  imports: [MongoModule],
  controllers: [UserController],
  exports: [UserService, ...userProvider],
  providers: [UserService, ...userProvider],
})
export class UserModule {}
