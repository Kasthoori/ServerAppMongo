module.exports = mongoose => {
    var schema = mongoose.Schema({
        name: String,
        price: String,
        description: String
    },
    { timestamps: true }
    
    );

    schema.method("toJson", function(){
        const { __v, _id, ...object  } = this.toObject();
        object.id = _id;
        return object;
    });

    const Book = mongoose.model("book", schema);
    return Book;
}