import { Author } from "../../DB/Models/author.js";
import { Book } from "../../DB/Models/book.js";

export const createBook = async (req, res) => {
  const { title, content, author, publishedDate } = req.body;

  const existingBook = await Book.findOne({ title });
  if (existingBook) {
    return res.status(409).json({ message: "Book already exists" });
  }
  const book = await Book.create({ title, content, author, publishedDate });
  const existauthor = await Author.findOne({ author });
  if (!existauthor) {
    return res.status(404).json({ message: "Author not found" });
  }
  author.books.push(book.id);
  await author.save();
  res.json({ message: "Book created successfully" });
};

export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
};

export const updateBook = async (req, res) => {
 const book =  await Book.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Book updated successfully" , book});
};

export const deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  const author = await Author.findOne({ name: book.author });
  author.books = author.books.filter(
    (b) => b.toString() !== book._id.toString()
  );
  await author.save();
  await book.deleteOne();

  res.json({ message: "Book deleted successfully" });
};
