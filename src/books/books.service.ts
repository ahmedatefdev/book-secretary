import { Injectable } from '@nestjs/common';
import Book from './book.entity';
import CreatBookDto from './dto/creat-book.dto';
import UpdateBookDto from './dto/update-book.dto';

@Injectable()
export class BooksService {
  books: Book[];
  async GetBooks(isAuthenticate?: boolean): Promise<Book[]> {
    return await new Promise(() => this.books);
  }
  GetBookByID(id: string, isAuthenticate?: boolean): Promise<Book> {
    throw new Error('Method not implemented.');
  }
  CreateBook(creatBookDto: CreatBookDto): Promise<Book> {
    throw new Error('Method not implemented.');
  }
  UpdateBook(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    throw new Error('Method not implemented.');
  }
  DeleteBook(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
