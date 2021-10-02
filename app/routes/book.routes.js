module.exports = app => {

    const books = require('../controllers/book.controller');

    var router = require("express").Router();

    //Create new book
    router.post('/', books.create);

    //Get all books
    router.get('/', books.findAll);

    //Get all published books
    router.get('/published', books.findAllPublished);

    //Get single book
    router.get('/:id', books.findOne);

    //Update book
    router.put('/:id', books.update);

    //Delete one book
    router.delete('/:id', books.delete);

    //Delete all books
    router.delete('/', books.deleteAll);

    app.use('/api/books', router);
}