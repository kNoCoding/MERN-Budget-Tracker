import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const assetSchema = new mongoose.Schema({
    type: String,
    description: String,
    amount: Number,
    account: String,
    date: Date,
    user: {
        type: ObjectId,
        ref: 'User',
        required: true,
    }
})

const Asset = mongoose.model('Asset', assetSchema)

export default Asset