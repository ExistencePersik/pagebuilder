import { Request, Response } from 'express'
import { Footers } from '../models/models.js'

class FootersController {
	async create(req: Request, res: Response) {
		try {
			const { name, subject } = req.body
			const elems = await Footers.create({ name, subject })
			return res.json(elems)
		} catch (err) {
			console.error(err)
		}
	}

	async getAll(req: Request, res: Response) {
		const elems = await Footers.findAll()
		return res.json(elems)
	}
}

export default new FootersController()
