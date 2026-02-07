import { Router } from 'express'
import { UserController } from '../controller/userController.js'

export const LoginRouter = Router()

LoginRouter.post('/', UserController.login)
