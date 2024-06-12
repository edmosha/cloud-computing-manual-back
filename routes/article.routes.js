import { Router } from 'express'
import {
  verifyAccess,
  verifyAuth,
  verifyPermission
} from '../middlewares/index.js'
import {getFullContent, createSection, createArticle, getArticleById} from "../services/article.services.js";

const router = Router()

router
  .get('/', getFullContent)
  .get('/:articleId', getArticleById)
  .post('/create-section', [verifyAuth], createSection)
  .post('/create-article', [verifyAuth], createArticle)
  // .post('/login', loginUser)
  // .get('/logout', verifyAccess, logoutUser)
  // .delete('/remove', [verifyAccess, verifyPermission], removeUser)

export default router
