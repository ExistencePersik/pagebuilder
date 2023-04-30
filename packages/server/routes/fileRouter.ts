import { Router } from 'express'
import FilesController from '../controllers/filesController.js'

const router = Router()

router.get('/file/:fileName', FilesController.getFile)
router.post('/file', FilesController.postFile)

export default router
