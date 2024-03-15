import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  const bearerHeader = req.headers['authorization']

  console.log('Decoded JWT:', req.user);


  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken

    try {
      const decoded = jwt.verify(req.token, process.env.JWT_SECRET)
      req.user = decoded
      next()
    } catch (error) {
      res.status(401).json({ message: 'Token is not valid' })
    }
  } else {
    res.status(401).json({ message: 'No token, authorization denied' })
  }
}

export default authMiddleware
