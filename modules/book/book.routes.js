import { Router } from "express";
import { createBook, deleteBook, getBookById, updateBook } from "./book.controllers.js";

const bookRouter= Router()

bookRouter.post("/book" , createBook)
bookRouter.get("/book/:id" , getBookById)
bookRouter.delete("/book/:id" , deleteBook)
bookRouter.patch("/book/:id" , updateBook)

export default bookRouter