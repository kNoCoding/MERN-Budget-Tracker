import mongoose from 'mongoose'

const incomeSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    category: String,
    date: Date,
    description: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

const Income = mongoose.model('Income', incomeSchema)

export default Income