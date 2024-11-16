import express from 'express'
import controller from '../controllers/asset.controller.js'

const router = express.Router()

router.post('/', controller.createAsset)
router.get('/', controller.getAllAssets)
router.get('/:id', controller.getAssetById)
router.put('/:id', controller.updateAssetById)
router.delete('/:id', controller.deleteAssetById)

export default router