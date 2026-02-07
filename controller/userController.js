import { UserModel } from '../models/postgres/userModel.js'
import { validateUser } from '../schemas/userValidation.js'
import jwt from 'jsonwebtoken'

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

      const token = jwt.sign({ id: userLogin.id, username: userLogin.username }, process.env.SECRET_JWT_KEY, {
      expiresIn: '1h'
      })
      return res.status(200).cookie('access_token', token, {
        httpOnly: true, // No se puede acceder a esta cookie desde JavaScript
        secure: process.env.NODE_ENV === 'production', // Solo se envía en conexiones HTTPS
        sameSite: 'strict', // No se envía en solicitudes de terceros (solo al propio dominio)
        maxAge: 60 * 60 * 1000 // La cookie expira en 1 hora
      }).json({ message: 'Login successful', user: userLogin })

    } catch (err) {
      return res.status(400).json({ message: err.message || 'Login error' })
    }
  }

}