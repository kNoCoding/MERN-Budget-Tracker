import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const assetSchema = new mongoose.Schema({
    type: String,
    description: String,
    amount: {
        type: Number,
        required: true,
    },
    account: String,
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true,
    }
})

const Asset = mongoose.model('Asset', assetSchema)

export default Asset