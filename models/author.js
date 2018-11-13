import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name: String,
    age: String,
    authorId: String
});

const AuthorModel = mongoose.model('Author ', AuthorSchema);

export default AuthorModel;
