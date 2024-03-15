const adminMiddleware = (req, res, next) => {
    console.log('Admin check for user:', req.user);
    if (req.user?.isAdmin) {
        next()
    } else {
        res.status(403).json({ message: 'Access denied. Requires admin privileges.' })
    }
}

export default adminMiddleware