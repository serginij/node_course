"use strict";
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const { booksRouter, userRouter, mainRouter, chatRouter } = require('./routes');
const { notFoundMiddleware, authMiddleware } = require('./middleware');
const { connectToDb, app, httpServer } = require('./utils');
const PORT = process.env.PORT || 3000;
app.use(require('express-session')({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(authMiddleware);
app.use('/books', booksRouter);
app.use('/user', userRouter);
app.use('/chat', chatRouter);
app.use('/', mainRouter);
app.use(notFoundMiddleware);
const start = async () => {
    try {
        await connectToDb();
        httpServer.listen(PORT, '0.0.0.0', () => console.log(`App available on http://localhost:${PORT}`));
    }
    catch (err) {
        console.log(err);
    }
};
start();
System.register("types", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("models/books/books.model", [], function (exports_2, context_2) {
    "use strict";
    var _a, Schema, model, bookSchema, Book;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            _a = require('mongoose'), Schema = _a.Schema, model = _a.model;
            bookSchema = new Schema({
                title: { type: String, required: true },
                description: { type: String, default: '' },
                authors: { type: String, required: true },
                favorite: { type: Boolean, default: false },
                fileCover: { type: String, default: '' },
                fileBook: { type: String, required: true },
            });
            exports_2("Book", Book = model('Book', bookSchema));
        }
    };
});
System.register("models/books/books.module", ["axios", "models/books/books.model"], function (exports_3, context_3) {
    "use strict";
    var axios_1, books_model_1, COUNTER_PORT, COUNTER_HOST, BookModule;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (axios_1_1) {
                axios_1 = axios_1_1;
            },
            function (books_model_1_1) {
                books_model_1 = books_model_1_1;
            }
        ],
        execute: function () {
            COUNTER_PORT = process.env.COUNTER_PORT || 3001;
            COUNTER_HOST = process.env.COUNTER_HOST || 'localhost';
            BookModule = class BookModule {
                constructor() {
                    this.createBook = async (book) => {
                        try {
                            const bookModel = new books_model_1.Book(book);
                            await bookModel.save();
                            return bookModel;
                        }
                        catch (err) {
                            console.error(err);
                            return null;
                        }
                    };
                    this.getBooks = async () => {
                        try {
                            const books = await books_model_1.Book.find().select('-__v').lean();
                            const res = await axios_1.default.get(`http://${COUNTER_HOST}:${COUNTER_PORT}/counter`);
                            const viewsById = JSON.parse(res.data);
                            const formatted = books.map((book) => ({
                                ...book,
                                views: viewsById[book._id] || 0,
                            }));
                            return formatted;
                        }
                        catch {
                            return null;
                        }
                    };
                    this.getBookById = async (id) => {
                        try {
                            const book = await books_model_1.Book.findById(id).select('-__v').lean();
                            const res = await axios_1.default.post(`http://${COUNTER_HOST}:${COUNTER_PORT}/counter/${id}/incr`);
                            const { views } = JSON.parse(res.data);
                            return { ...book, views };
                        }
                        catch {
                            return null;
                        }
                    };
                    this.updateBook = async (id, book) => {
                        try {
                            return await books_model_1.Book.findByIdAndUpdate(id, book);
                        }
                        catch (err) {
                            console.error(err);
                            return null;
                        }
                    };
                    this.deleteBook = async (id) => {
                        try {
                            await books_model_1.Book.findByIdAndDelete(id);
                            return true;
                        }
                        catch (err) {
                            console.error(err);
                            return false;
                        }
                    };
                }
            };
            exports_3("BookModule", BookModule);
        }
    };
});
System.register("models/books/index", ["models/books/books.module"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (books_module_1_1) {
                exports_4({
                    "BookModule": books_module_1_1["BookModule"]
                });
            }
        ],
        execute: function () {
        }
    };
});
System.register("routes/books/books.service", ["path", "models/books/index"], function (exports_5, context_5) {
    "use strict";
    var path_1, books_1, Book, getBooks, getBookById, updateBookData, deleteBookById, createNewBook, getAllBooks, renderNewBook, renderBookById, getBook, createBook, updateBook, deleteBook, dowloadBook;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (path_1_1) {
                path_1 = path_1_1;
            },
            function (books_1_1) {
                books_1 = books_1_1;
            }
        ],
        execute: function () {
            Book = new books_1.BookModule();
            getBooks = Book.getBooks, getBookById = Book.getBookById, updateBookData = Book.updateBook, deleteBookById = Book.deleteBook, createNewBook = Book.createBook;
            exports_5("getAllBooks", getAllBooks = async (req, res) => {
                const books = await getBooks();
                if (books) {
                    res.render('books/list', {
                        title: 'Books list',
                        books,
                    });
                }
                else {
                    res.redirect('/404');
                }
            });
            exports_5("renderNewBook", renderNewBook = (req, res) => {
                res.render('books/create', {
                    title: 'Book create',
                    book: { isNew: true },
                });
            });
            exports_5("renderBookById", renderBookById = async (req, res) => {
                const { id } = req.params;
                const book = await getBookById(id);
                if (!book) {
                    res.status(404).redirect('/404');
                }
                res.render('books/update', {
                    title: 'Book update',
                    book,
                });
            });
            exports_5("getBook", getBook = async (req, res) => {
                const { id } = req.params;
                try {
                    const book = await getBookById(id);
                    const { displayName } = req.user;
                    if (book) {
                        res.render('books/view', {
                            title: 'Book view',
                            book,
                            displayName,
                        });
                    }
                    else {
                        res.redirect('/books');
                    }
                }
                catch (err) {
                    console.error(err);
                    res.status(500).json(err);
                }
            });
            exports_5("createBook", createBook = async (req, res) => {
                const { files, body } = req;
                const { fileBook, fileCover } = files;
                try {
                    const book = await createNewBook({
                        ...body,
                        fileBook: fileBook[0].path,
                        fileCover: fileCover?.[0]?.path || '',
                        favorite: body.favorite === 'on',
                    });
                    if (book) {
                        res.status(200).redirect('/books');
                    }
                    else {
                        res.status(500).json({ message: 'An error occured while creating book' });
                    }
                }
                catch (err) {
                    console.error(err);
                    res.status(500).json(err);
                }
            });
            exports_5("updateBook", updateBook = async (req, res) => {
                const { files, params, body } = req;
                const { id } = params;
                try {
                    const { fileBook, fileCover, favorite, ...data } = body;
                    const bookFile = {};
                    const cover = {};
                    if (files) {
                        const { fileBook, fileCover } = files;
                        if (fileBook?.[0])
                            bookFile.fileBook = fileBook[0].path;
                        if (fileCover?.[0])
                            cover.fileCover = fileCover[0].path;
                    }
                    const book = {
                        ...data,
                        ...bookFile,
                        ...cover,
                        favorite: favorite === 'on',
                    };
                    const status = await updateBookData(id, book);
                    if (!status)
                        throw 'An error occured while saving book';
                    res.status(200).redirect('/books');
                }
                catch (err) {
                    console.error(err);
                    res.status(500).json(err);
                }
            });
            exports_5("deleteBook", deleteBook = async (req, res) => {
                const { id } = req.params;
                try {
                    const status = await deleteBookById(id);
                    if (!status)
                        throw 'An error occured while deleting book';
                    res.status(204).redirect('/books');
                }
                catch (err) {
                    console.error(err);
                    res.status(500).json(err);
                }
            });
            exports_5("dowloadBook", dowloadBook = async (req, res) => {
                const { id } = req.params;
                try {
                    const book = await getBookById(id);
                    if (!book) {
                        res.status(404).redirect('/404');
                    }
                    const { fileBook } = book;
                    res.download(path_1.default.join(__dirname, '..', fileBook), (err) => {
                        if (err) {
                            console.error(err);
                            res.status(404).redirect('/404');
                        }
                    });
                }
                catch (err) {
                    console.error(err);
                    res.status(500).json(err);
                }
            });
        }
    };
});
System.register("routes/books/books.controller", ["routes/books/books.service"], function (exports_6, context_6) {
    "use strict";
    var books_service_1, express, fileMiddleware, router;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (books_service_1_1) {
                books_service_1 = books_service_1_1;
            }
        ],
        execute: function () {
            express = require('express');
            fileMiddleware = require('../../middleware').fileMiddleware;
            router = express.Router();
            router.get('/', books_service_1.getAllBooks);
            router.get('/create', books_service_1.renderNewBook);
            router.get('/update/:id', books_service_1.renderBookById);
            router.get('/:id', books_service_1.getBook);
            router.post('/create', fileMiddleware.fields([
                { name: 'fileBook', maxCount: 1 },
                { name: 'fileCover', maxCount: 1 },
            ]), books_service_1.createBook);
            router.post('/update/:id', fileMiddleware.fields([
                { name: 'fileBook', maxCount: 1 },
                { name: 'fileCover', maxCount: 1 },
            ]), books_service_1.updateBook);
            router.post('/delete/:id', books_service_1.deleteBook);
            router.get('/:id/download', books_service_1.dowloadBook);
            module.exports = router;
        }
    };
});
//# sourceMappingURL=index.js.map