import mongoose from 'mongoose'

const { Schema, model } = mongoose

const sectionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    articles: [{
      type: Schema.Types.ObjectId,
      ref: 'Article',
      default: [],
    }],
  },
  {
    timestamps: true
  }
)

export default model('Section', sectionSchema)
