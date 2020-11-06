import { Injectable } from '@nestjs/common';
import CreatBookDto from './dto/creat-book.dto';
import UpdateBookDto from './dto/update-book.dto';

@Injectable()
export class BooksService {
  books: any[];
  async GetBooks(isAuthenticate?: boolean): Promise<any[]> {
    return await new Promise(() => this.books);
  }
  GetBookByID(id: string, isAuthenticate?: boolean): Promise<any> {
    throw new Error('Method not implemented.');
  }
  CreateBook(creatBookDto: CreatBookDto): Promise<any> {
    throw new Error('Method not implemented.');
  }
  UpdateBook(id: string, updateBookDto: UpdateBookDto): Promise<any> {
    throw new Error('Method not implemented.');
  }
  DeleteBook(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
