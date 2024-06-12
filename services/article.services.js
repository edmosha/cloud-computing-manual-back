import User from '../models/User.js'
import Section from "../models/Section.js";
import Article from "../models/Article.js";

export const getFullContent = async (req, res, next) => {
  try {
    const data = await Section.find().populate('articles')

    console.log(data)

    // req.payload = data

    res.status(200).json({ data })

    // next('route')
  } catch (e) {
    console.log('*getArticles service')
    next(e)
  }
}

export const getArticleById = async (req, res, next) => {
  console.log(req)
  const articleId = req.params.articleId

  if (!articleId) {
    return res.status(400).json({ message: 'User ID must be provided' })
  }
  
  try {
    const data = await Article.findById(articleId)

    console.log(data)

    res.status(200).json({ data })

  } catch (e) {
    console.log('*getArticles service')
    next(e)
  }
}

export const createSection = async (req, res, next) => {
  const name = req.body?.name

  if (!name ) {
    return res
      .status(400)
      .json({ message: 'Поле name является обязательным' })
  }

  try {
    const [existingSection] = await Section.find({
      name
    })

    if (existingSection) {
      return res
        .status(409)
        .json({ message: 'Раздел с такиим названием уже существует' })
    }

    const newSection = await Section.create({
      name,
      articles: [],
    })

    req.payload = { data: newSection }

    next('route')
  } catch (e) {
    console.log('*createSection service')
    next(e)
  }
}

export const createArticle = async (req, res, next) => {
  const name = req.body?.name
  const content = req.body?.content
  const sectionId = req.body?.sectionId

  if (!name) {
    return res
      .status(400)
      .json({ message: 'Поле name является обязательным' })
  }

  if (!content) {
    return res
      .status(400)
      .json({ message: 'Поле content является обязательным' })
  }

  if (!sectionId) {
    return res
      .status(400)
      .json({ message: 'Поле sectionId является обязательным' })
  }

  try {
    const section = await Section.findById(sectionId)

    if (!section) {
      return res
        .status(400)
        .json({ message: 'Такого раздела не существует' })
    }

    const newArticle = await Article.create({
      name,
      content,
      sectionId,
    })

    await Section.findByIdAndUpdate(
      sectionId,
      {
        $addToSet: { articles: newArticle.id }
      }
    )
      .populate('articles')

    req.payload = { newArticle }

    next('route')
  } catch (e) {
    console.log('*createSection service')
    next(e)
  }
}