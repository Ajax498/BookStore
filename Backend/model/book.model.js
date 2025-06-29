import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: String,
  title: String,
  author: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  pdfUrl: String,
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
