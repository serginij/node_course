import {
  Controller,
  Get,
  Post,
  Res,
  Req,
  UsePipes,
  Param,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import path from 'path';
import { BookService } from '../core/book.service';

import { StringValidationPipe } from 'src/common/pipes/validation.pipe';
import { BookDto } from '../dto/book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAll(@Res() res) {
    const books = await this.bookService.getBooks();

    if (books) {
      res.render('books/list', {
        title: 'Books list',
        books,
      });
    } else {
      res.redirect('/404');
    }
  }

  @Get('/create')
  getNewBookPage(@Res() res) {
    res.render('books/create', {
      title: 'Book create',
      book: { isNew: true },
    });
  }

  @Get('/update/:id')
  async getUpdateBookPage(@Req() req, @Res() res) {
    const { id } = req.params;
    const book = await this.bookService.getBookById(id);

    if (!book) {
      res.status(404).redirect('/404');
    }

    res.render('books/update', {
      title: 'Book update',
      book,
    });
  }

  @Get('/:id')
  async getBookById(@Req() req, @Res() res) {
    const { id } = req.params;
    try {
      const book = await this.bookService.getBookById(id);

      if (book) {
        res.render('books/view', {
          title: 'Book view',
          book,
          displayName: '',
        });
      } else {
        res.redirect('/books');
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  // TODO: add file middleware
  @Post('/create')
  @UsePipes(new ValidationPipe())
  async createBook(@Body() body: BookDto, @Res() res) {
    try {
      const book = await this.bookService.createBook(body);

      if (book) {
        res.status(200).redirect('/books');
      } else {
        res
          .status(500)
          .json({ message: 'An error occured while creating book' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  // TODO: add file middleware
  @Post('/update/:id')
  async updateBook(@Req() req, @Res() res) {
    const { params, body } = req;
    const { id } = params;
    try {
      const status = await this.bookService.updateBook(id, body);

      if (!status) throw 'An error occured while saving book';

      res.status(200).redirect('/books');
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  @UsePipes(StringValidationPipe)
  @Post('/delete/:id')
  async deleteBook(@Param() id: string, @Res() res) {
    try {
      const status = await this.bookService.deleteBook(id);

      if (!status) throw 'An error occured while deleting book';

      res.status(204).redirect('/books');
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  @Get('/:id/download')
  async downloadBookById(@Req() req, @Res() res) {
    const { id } = req.params;

    try {
      const book = await this.bookService.getBookById(id);

      if (!book) {
        return res.status(404).redirect('/404');
      }
      const { fileBook } = book;

      res.download(path.join(__dirname, '..', fileBook || ''), (err) => {
        if (err) {
          console.error(err);
          res.status(404).redirect('/404');
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
}
