import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.access_token

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' })
  }

  try {
    const data = jwt.verify(token, process.env.SECRET_JWT_KEY)
    req.user = data
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}
