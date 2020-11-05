import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import Book from './book.entity';
import { BooksService } from './books.service';
import CreatBookDto from './dto/creat-book.dto';
import UpdateBookDto from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookServices: BooksService) {}

  @Get()
  public GetBooks(): Promise<Book[]> {
    return this.bookServices.GetBooks();
  }

  @Get(':id')
  GetBookByID(@Param('id', ParseUUIDPipe) id: string): Promise<Book> {
    return this.bookServices.GetBookByID(id);
  }

  @Post()
  CreateBook(@Body(ValidationPipe) createBookDTO: CreatBookDto): Promise<Book> {
    return this.bookServices.CreateBook(createBookDTO);
  }

  @Patch(':id')
  UpdateBook(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateBookDTO: UpdateBookDto,
  ): Promise<Book> {
    return this.bookServices.UpdateBook(id, updateBookDTO);
  }

  @Delete(':id')
  DeleteBook(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.bookServices.DeleteBook(id);
  }
}
