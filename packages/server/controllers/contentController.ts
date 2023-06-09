import { Request, Response } from 'express'
import { Content } from '../models/models.js'

class contentController {
	async create(req: Request, res: Response) {
		try {
			const { name, subject } = req.body
			const elems = await Content.create({ name, subject })
			return res.json(elems)
		} catch (err) {
			console.error(err)
		}
	}

	async getAll(req: Request, res: Response) {
		const elems = await Content.findAll()
		return res.json(elems)
	}
}

export default new contentController()
