import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './typeorm.config';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url:
        'mongodb+srv://u101_test:KWj2z5iJjp0Id4Nm@clusternest.napxi.mongodb.net/c4t_books_api?retryWrites=true&w=majority',
      useNewUrlParser: true,
      logging: true,
      ssl: true,
      useUnifiedTopology: true,
      entities: [join(__dirname, '/**/*.entity.{js,ts}')],
      synchronize: true,
    }),
    BooksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
