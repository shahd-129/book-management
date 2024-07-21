import { Author } from "../../DB/Models/author.js";
import { Book } from "../../DB/Models/book.js";


export const createAuthor = async (req, res) => {
  const { name, bio, birthdate , books } = req.body;

  const existingAuthor = await Author.findOne({ name });
  if (existingAuthor) {
    return res.status(409).json({ message: "Author already exists" });
  }

  await Author.create({
    name,
    bio,
    birthdate,
    books
  });
  res.json({ message: "Author created successfully" });
};

export const getAuthorById = async (req, res) => {
  const author = await Author.findById(req.params.id)
  .populate({
    path: "books",
    select: "title -_id",
  });
  console.log(req.params._id);
  res.json(author);
};

export const updateAuthor = async (req, res) => {
 const update =  await Author.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Author updated successfully" , update});
};

export const deleteAuthor = async (req, res) => {
  const author = await Author.findById(req.params.id);

  const books = await Book.find({ author: author.name });

  for (const book of books) {
    await Book.findByIdAndDelete(book._id);
  }

  await Author.findByIdAndDelete(req.params.id);

  res.json({ message: "Author deleted successfully" });
};
