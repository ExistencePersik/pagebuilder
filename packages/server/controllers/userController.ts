import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import ApiError from './apiError.js'
import { SavedPages, User } from '../models/models.js'

const generateJwt = (id: number, email: string, role: string) => {
	return jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class UserController {
	async registration(req: Request, res: Response, next: NextFunction) {
		const { email, password, role } = req.body

		if (!email || !password) {
			return next(ApiError.badRequest('Wrong email or password.'))
		}

		const alreadyHere = await User.findOne({ where: { email } })

		if (alreadyHere) {
			return next(ApiError.badRequest('This email address has already been registered.'))
		}

		const hashPassword = await bcrypt.hash(password, 5)
		const user = await User.create({ email, role, password: hashPassword })
		const token = generateJwt(user.id, user.email, user.role)

		return res.json({ token })
	}

	async login(req: Request, res: Response, next: NextFunction) {
		const { email, password } = req.body
		const user = await User.findOne({ where: { email } })

		if (!user) {
			return next(ApiError.internalError('User not found.'))
		}

		const comparePassword = bcrypt.compareSync(password, user.password)

		if (!comparePassword) {
			return next(ApiError.internalError('Wrong password.'))
		}

		const token = generateJwt(user.id, user.email, user.role)

		return res.json({ token })
	}

	async check(req: Request, res: Response) {
		const token = generateJwt(req.user.id, req.user.email, req.user.role)
		return res.json({ token })
	}

	async getSavedPages(req: Request, res: Response) {
		try {
			const { userId } = req.params

			if (!userId) return res.json('There are no saved pages.')

			const savedPages = await SavedPages.findAll({ where: { userId } })
			return res.json(savedPages)
		} catch (err) {
			console.log('', err)
			return res.json(err)
		}
	}

	async savePage(req: Request, res: Response) {
		try {
			const { userId: userId, currentElements: pageInfo } = req.body
			const savePage = await SavedPages.create({ userId, pageInfo })
			return res.json(savePage)
		} catch (err) {
			console.log(err)
			return res.json(err)
		}
	}

	async updatePage(req: Request, res: Response) {
		try {
			const { userPageId: userPageId, currentElements: pageInfo } = req.body
			if (!pageInfo) return res.json('pageInfo error')
			if (!userPageId) return res.json('userPageId error')
			await SavedPages.update({ pageInfo }, { where: { id: userPageId } })
			return res.json('Page was saved.')
		} catch (err) {
			console.log(err)
			return res.json(err)
		}
	}

	async deletePage(req: Request, res: Response) {
		try {
			const { id } = req.params
			await SavedPages.destroy({ where: { id } })
			return res.json('Page was deleted.')
		} catch (err) {
			console.log(err)
			return res.json(err)
		}
	}
}

export default new UserController()
