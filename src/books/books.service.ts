import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/user.model';
import DB_ERROR_CODES from '../db-error-codes.enum';
import MODELS_NAMES from '../models-names.enum';
import { Book, BOOK_TYPE } from './book.model';
import { CreateBookDto } from './dto/creat-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(MODELS_NAMES.BOOK)
    private readonly bookModel: Model<Book>,
  ) {}

  async GetBooks(user: User): Promise<any[]> {
    const books = await this.bookModel.find(
      user ? {} : { type: BOOK_TYPE.PUBLIC },
      'title description publication_date author',
    );
    return books;
  }
  async GetBookByID(id: string, user: User): Promise<any> {
    const book = await this.bookModel.findOne(user ? { _id: id } : { _id: id });
    if (!book) throw new NotFoundException('book Not found.');
    else if (book.type === BOOK_TYPE.PRIVET && !user)
      throw new UnauthorizedException('this book for authorized users only.');
    return book;
  }
  async CreateBook(
    createBookDto: CreateBookDto,
    user: User,
    cover?: { buffer: any; mimetype: string },
  ): Promise<any> {
    const {
      title,
      author,
      description,
      publication_date,
      type,
    } = createBookDto;

    const newBook = new this.bookModel();
    newBook.title = title;
    newBook.author = author;
    newBook.description = description;
    newBook.publication_date = publication_date;
    if (cover) {
      newBook.cover.data = cover.buffer;
      newBook.cover.contentType = cover.mimetype;
    }
    newBook.type = type;
    newBook.user_id = user.id;

    try {
      await newBook.save();
      return newBook;
    } catch (error) {
      if (error.code == DB_ERROR_CODES.DB_CONFLICT_CODE)
        throw new ConflictException('title already exists');
      else throw new InternalServerErrorException();
    }
  }

  async UpdateBook(id: string, updateBookDto: UpdateBookDto): Promise<any> {
    const book = await this.bookModel.findByIdAndUpdate(id, updateBookDto, {
      new: true,
    });
    if (!book) throw new NotFoundException('book Not found');
    return book;
  }

  async DeleteBook(id: string): Promise<void> {
    const book = await this.bookModel.findByIdAndDelete(id);
    if (!book) throw new NotFoundException('book Not found');
  }
}
