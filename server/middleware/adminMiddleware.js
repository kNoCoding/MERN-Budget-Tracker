const adminMiddleware = (req, res, next) => {
    if (req.user?.isAdmin) {
        next()
    } else {
        res.status(403).json({ message: 'Access denied. Requires admin privileges.' })
    }
}

export default adminMiddleware