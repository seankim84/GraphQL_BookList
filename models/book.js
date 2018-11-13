import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
});

const BookModel = mongoose.model('Book', BookSchema);

export default BookModel;

