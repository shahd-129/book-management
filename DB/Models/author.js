import mongoose from "mongoose";


const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      bio: {
        type: String,
      },
      birthdate: {
        type: Date,
      },
      books: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "book",
        },
      ],
})

export const Author = mongoose.model("author" , authorSchema)