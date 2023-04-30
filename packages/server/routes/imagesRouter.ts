import { Router } from 'express'
import imagesController from '../controllers/imagesController.js'

const router = Router()

router.post('/image', imagesController.addImage)

export default router
