import express from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import 'dotenv/config'

const app = express()



app.listen(process.env.PORT, () => {
  console.log(`server listening in http://localhost:${process.env.PORT}`)
})