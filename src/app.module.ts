import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://u101_test:KWj2z5iJjp0Id4Nm@clusternest.napxi.mongodb.net/books_shelf_c4t?retryWrites=true&w=majority',
      { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true },
    ),
    BooksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
