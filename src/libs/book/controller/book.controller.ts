import { Controller, Get, Post, Res, Req } from '@nestjs/common';
import { Book } from 'core/book/book.model';
import path from 'path';
import { BookService } from '../core/book.service';
import { IUserRequest } from '../interface/book.interface';

// TODO: add DTO validation && replace coreBookService with bookService
// Add @Body
// Replace IBook with Book model or BookDto
@Controller('book')
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
      const { displayName } = (req as IUserRequest).user;

      if (book) {
        res.render('books/view', {
          title: 'Book view',
          book,
          displayName,
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
  async createBook(@Req() req, @Res() res) {
    const { files, body } = req;
    const { fileBook, fileCover } = files;

    try {
      const book = await this.bookService.createBook({
        ...body,
        fileBook: fileBook[0].path,
        fileCover: fileCover?.[0]?.path || '',
        favorite: body.favorite === 'on',
      });

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
    const { files, params, body } = req;
    const { id } = params;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { fileBook, fileCover, favorite, ...data } = body;

      const bookFile: { fileBook?: string } = {};
      const cover: { fileCover?: string } = {};

      if (files) {
        const { fileBook, fileCover } = files;

        if (fileBook?.[0]) bookFile.fileBook = fileBook[0].path;
        if (fileCover?.[0]) cover.fileCover = fileCover[0].path;
      }

      const book = {
        ...data,
        ...bookFile,
        ...cover,
        favorite: favorite === 'on',
      };

      const status = await this.bookService.updateBook(id, book);

      if (!status) throw 'An error occured while saving book';

      res.status(200).redirect('/books');
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  @Post('/delete/:id')
  async deleteBook(@Req() req, @Res() res) {
    const { id } = req.params;

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
        res.status(404).redirect('/404');
      }
      const { fileBook } = book as Book;

      res.download(path.join(__dirname, '..', fileBook), (err) => {
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
