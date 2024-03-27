import bcrypt from 'bcryptjs'

import User from "../models/user.js"

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({ message: error.message + 'somethings wrong!' })
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ message: "User not found" })
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const updateUserById = async (req, res) => {
    const { id } = req.params
    const { password, ...updateData } = req.body

    try {
        let hashedPassword
        if (password) {
            hashedPassword = await bcrypt.hash(password, 8)
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { ...updateData, ...(password && { password: hashedPassword }) },
            { new: true }
        )

        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteUserById = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(204).send()
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
