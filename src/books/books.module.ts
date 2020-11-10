import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import MODELS_NAMES from '../models-names.enum';
import BookSchema from './book.model';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MODELS_NAMES.BOOK, schema: BookSchema },
    ]),
    AuthModule,
  ],
  controllers: [BooksController],
  providers: [BooksService],  
})
export class BooksModule {}
