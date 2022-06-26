import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    imageLink: String,
    genre: String,
    price: Number,
    inventory: Number,
});

const Book = mongoose.model("book", bookSchema);

export default Book;

