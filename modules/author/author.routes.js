import express from 'express'
import { createAuthor, deleteAuthor, getAuthorById, updateAuthor } from './author.controllers.js'

const authRouter = express.Router()


authRouter.post("/author",createAuthor)
authRouter.route("/author/:id").get(getAuthorById).patch(updateAuthor).delete(deleteAuthor)

export default authRouter