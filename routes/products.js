import { Router } from 'express'
import { ProductController } from '../controller/productController.js'

export const ProductRouter = Router()


ProductRouter.get('/', ProductController.getAll)