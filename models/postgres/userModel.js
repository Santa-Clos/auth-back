import { Pool } from 'pg'
import { randomUUID } from 'node:crypto'
import bcrypt from 'bcrypt'

const postgre = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

/*
  USER:
    -unique id
    -username
    -password
*/


export class UserModel {
  static async create ({ username, password }) {
    
    const user = await postgre.query(
      `SELECT username FROM users WHERE username = $1`,
      [username]
    );
    if(user.rowCount > 0) throw new Error('username already exists')
    const id = randomUUID()
    const hashedPassword = await bcrypt.hash(password, 10)

    const { rows } = await postgre.query(
      `INSERT INTO users (id, username, password) VALUES ($1, $2, $3)
      RETURNING *;`,
      [id, username, hashedPassword]
    )
    return rows[0] = {
      id,
      username,
    }
  }

  static async login ({ username, password }) {
    const { rows } = await postgre.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    )
    if (rows.length === 0) return null
    const user = rows[0]
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) return null
    return user
  }
}