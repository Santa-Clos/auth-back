import 'dotenv/config'
import express from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { RegisterRouter } from './routes/register.js'
import { LoginRouter } from './routes/login.js'
import { authMiddleware } from './middlewares/authMiddleware.js'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: `http://localhost:5173`,
  credentials: true
}))

app.get("/auth/me", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

app.use('/register', RegisterRouter)
app.use('/login', LoginRouter)


app.listen(process.env.PORT, () => {
  console.log(`server listening in http://localhost:${process.env.PORT}`)
})