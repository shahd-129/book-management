import express from 'express'
import authRouter from './Modules/author/author.routes.js'
import bookRouter from './modules/book/book.routes.js'
const app = express()
const port = 3000
import './DB/Connection_db.js'




app.use(express.json())

app.use("/" , authRouter)
app.use("/" , bookRouter)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))