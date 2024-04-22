import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const budgetSchema = new mongoose.Schema({
    totalAmount: {
        type: Number,
        required: true,
    },
    categories: [{
        name: String,
        allocatedAmount: Number,
    }],
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true,
    }
})

const Budget = mongoose.model('Budget', budgetSchema)

export default Budget
