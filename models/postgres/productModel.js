import { Pool } from 'pg'
import bcrypt from 'bcrypt'

const postgre = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

export class ProductModel {

  static async getAll() {
    const { rows } = await postgre.query( `SELECT * FROM products` )
    return rows
  }
}