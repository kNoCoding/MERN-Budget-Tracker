import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  // Get token from request header
  const bearerHeader = req.headers['authorization']

  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ')
    // Get token from array
    const bearerToken = bearer[1]
    // Set the token
    req.token = bearerToken

    try {
      // Verify token
      const decoded = jwt.verify(req.token, process.env.JWT_SECRET)
      // Add user from payload to request object
      req.user = decoded
      next()
    } catch (error) {
      res.status(401).json({ message: 'Token is not valid' })
    }
  } else {
    // Forbidden
    res.status(401).json({ message: 'No token, authorization denied' })
  }
}

export default authMiddleware
