import Asset from '../models/asset.model.js'

const createAsset = async (req, res) => {
    try {
        const userId = req.user.userId
        const assetData = {
            ...req.body,
            user: userId,
        }
        const newAsset = new Asset(assetData)
        const savedAsset = await newAsset.save()
        res.status(201).json(savedAsset)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAllAssets = async (req, res) => {
    try {
        const userId = req.user.userId
        const assets = await Asset.find({ user: userId })
        res.status(200).json(assets)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const getAssetById = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.id)
        if (!asset || asset.user.toString() !== req.user.userId) {
            return res.status(404).json({ message: "Asset not found or user mismatch" })
        }
        res.status(200).json(asset)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const updateAssetById = async (req, res) => {
    try {
        const userId = req.user.userId
        const assetUpdate = {
            ...req.body,
            user: userId,
        }
        const updatedAsset = await Asset.findByIdAndUpdate(req.params.id, assetUpdate, { new: true })
        res.status(200).json(updatedAsset)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteAssetById = async (req, res) => {
    try {
        const userId = req.user.userId
        const asset = await Asset.findById(req.params.id)
        if (!asset || asset.user.toString() !== userId) {
            return res.status(404).json({ message: "Asset not found or user mismatch" })
        }
        await Asset.findByIdAndDelete(req.params.id, { user: req.user.userId })
        res.status(204).send()
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const assetController = {
    createAsset,
    getAllAssets,
    getAssetById,
    updateAssetById,
    deleteAssetById
}

export default assetController
