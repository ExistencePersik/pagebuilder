import { Router } from 'express'
import UserController from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = Router()

router.post('/signup', UserController.registration)
router.post('/login', UserController.login)
router.get('/auth', authMiddleware, UserController.check)

router.get('/savedPages/:userId', UserController.getSavedPages)
router.post('/savedPages', UserController.savePage)
router.put('/savedPages', UserController.updatePage)
router.delete('/savedPages/:id', UserController.deletePage)

export default router
