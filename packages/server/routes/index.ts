import { Router } from 'express'
import userRouter from './userRouter.js'
import elementsRouter from './elementsRouter.js'
import imagesRouter from './imagesRouter.js'
import fileRouter from './fileRouter.js'

const router = Router()

router.use('/user', userRouter)
router.use('/elements', elementsRouter)
router.use('/images', imagesRouter)
router.use('/files', fileRouter)

export default router
