import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { mongoProvider } from 'src/providers/mongo/mongo';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  providers: [...mongoProvider],
  exports: [...mongoProvider],
})
export class MongoModule {}
