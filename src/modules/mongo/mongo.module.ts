import { Module } from '@nestjs/common';
import { mongoProvider } from 'src/providers/mongo/mongo';

@Module({
  providers: [...mongoProvider],
  exports: [...mongoProvider],
})
export class MongoModule {}
