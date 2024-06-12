import mongoose from 'mongoose'

const { Schema, model } = mongoose

const articleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    content: {
      type: String,
      required: true,
    },
    sectionId: {
      type: Schema.Types.ObjectId,
      ref: 'Article',
      required: true,
    }
  },
  {
    timestamps: true
  }
)

export default model('Article', articleSchema)
