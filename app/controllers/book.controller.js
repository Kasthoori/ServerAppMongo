const db = require('../models');
const Book = db.book;

//Create and Save new book
exports.create = (req, res) => {

    //validate request
    if(!req.body.name){
        res.status(400).send({message: 'Content cannot be empty'});
        return;
    }

    //Create a book
    const book = new Book({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        
    });

    //Save book
    book.save(book)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error detected'
            });
        });

};

//Get data
exports.findAll = (req, res) => {

    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "1"} } : {};

    Book.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some errors detected'
            })
        });

};

//Find a book with id
exports.findOne = (req, res) => {

    const id = req.params.id;

    Book.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: 'Not found with id' + id});
            }else{

                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error getting book"});
        });
    
};

//Update book
exports.update = (req, res) => {

    if(!req.body){
        return res.status(400).send({
            message: 'Update data cannot be empty'
        });
    }

    const id = req.params.id;

    Book.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(400).send({
                    message: `Cannot update book with id=${id}`
                });
            }else{
                res.send({message: "Book updated successfully"});
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating book with id" + id 
            });
        });

};

//Delete a particular book
exports.delete = (req, res) => {

    const id = req.params.id;
    
    Book.findByIdAndRemove(id)
        .then(data => {
            if(!data){
                res.status(400).send({
                    message: `Cannot delete Book with id=${id}`
                });
            }else{
                res.send({
                    message: "Book deleted successfully"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete book with id=" + id
            });
        });
};

//Delete all books
exports.deleteAll = (req, res) => {

    Book.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Books were deleted successfully`
            })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occured during deletion"
            });
        });

};

//Find published book
exports.findAllPublished = (req, res) => {
    Book.find({published: true})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some errors happened'
            })
        });
};
