import { Router } from 'express'
import { setCookie } from '../middlewares/index.js'
import authRoutes from './auth.routes.js'
import {getFullContent} from "../services/article.services.js";
import articleRoutes from "./article.routes.js";

const router = Router()

router.use('/articles', articleRoutes)

router.use('/auth', authRoutes).use(setCookie)

export default router
