import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  // Get token from request header
  const token = req.header('Authorization')

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' })
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Add user from payload to request object
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' })
  }
}

export default authMiddleware
