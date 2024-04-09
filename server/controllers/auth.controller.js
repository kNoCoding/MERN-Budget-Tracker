import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    try {
        const { email, password, isAdmin } = req.body
        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }

        user = new User({
            email,
            password,
            isAdmin,
        })

        await user.save()

        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.status(201).json({ token })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.json({ token })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}