import { Router } from 'express'
import UserController from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = Router()

router.post('/signup', UserController.registration)
router.post('/login', UserController.login)
router.get('/auth', authMiddleware, UserController.check)

export default router
