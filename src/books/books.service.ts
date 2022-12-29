import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create.dto';
import { Book, BookStatus } from './books.interface';

@Injectable()
export class BooksService {
  private books: Book[] = [
    {
      id: 0,
      title: 'John Doe',
      description: 'Lorem Ipsum',
      price: 400,
      status: BookStatus.IN_REVIEW,
    },
    {
      id: 1,
      title: 'John Doe',
      description: 'Lorem Ipsum',
      price: 200,
      status: BookStatus.PUBLISHED,
    },
  ];

  getAll(): Book[] {
    return this.books;
  }

  createBook(createBookDto: CreateBookDto): Book {
    const book: Book = {
      id: this.books.length,
      title: createBookDto.title,
      description: createBookDto.description,
      price: Math.floor(Math.random() * (500 - 100 + 1) + 100),
      status: BookStatus.IN_REVIEW,
    };

    this.books.push(book);

    return book;
  }

  updateBook(_id, status) {
    this.books = this.books.map((book) => {
      if (_id === book.id) book.status = status;

      return book;
    });

    return this.books;
  }
}
