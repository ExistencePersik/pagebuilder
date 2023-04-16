import { Router } from 'express'
import userRouter from './userRouter.js'
import elementsRouter from './elementsRouter.js'

const router = Router()

router.use('/user', userRouter)
router.use('/elements', elementsRouter)

export default router
