import { Router } from 'express'
import { UserController } from '../controller/userController.js'

export const RegisterRouter = Router()


RegisterRouter.post('/', UserController.create)
