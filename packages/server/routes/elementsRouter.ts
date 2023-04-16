import { Router } from 'express'
import elementsController from '../controllers/elementsController.js'
import headersController from '../controllers/headersController.js'
import contentController from '../controllers/contentController.js'
import footersController from '../controllers/footersController.js'
import roleCheckMiddleware from '../middleware/roleCheckMiddleware.js'

const router = Router()

router.post('/headers', roleCheckMiddleware('ADMIN'), headersController.create)
router.get('/headers', headersController.getAll)

router.post('/content', roleCheckMiddleware('ADMIN'), contentController.create)
router.get('/content', contentController.getAll)

router.post('/footers', roleCheckMiddleware('ADMIN'), footersController.create)
router.get('/footers', footersController.getAll)

router.get('/all', elementsController.getAll)

export default router
