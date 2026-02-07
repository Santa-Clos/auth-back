import { UserModel } from '../models/postgres/userModel.js'
import { validateUser } from '../schemas/userValidation.js'


export class UserController {

  static async create (req, res) {
    try {
      const result = await validateUser(req.body)
      if (result.error) {
        return res.status(400).json('Error en la validacion de datos')
      }
      const newUser = await UserModel.create({
        username: result.data.username,
        password: result.data.password
      })
      return res.status(201).json({ message: 'Validation passed', user: newUser })
    } catch (err) {
      return res.status(400).json({ message: err.message || 'Validation error' })
    }
  }

  static async login(req, res) {
    try {
      const result = await validateUser(req.body)
      if (result.error) {
        return res.status(400).json('Error en la validacion de datos')
      }

      const userLogin = await UserModel.login({
        username: result.data.username,
        password: result.data.password
      })

      if (!userLogin) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }

      return res.status(200).json({ message: 'Login successful', user: userLogin })

    } catch (err) {
      return res.status(400).json({ message: err.message || 'Login error' })
    }
  }

}