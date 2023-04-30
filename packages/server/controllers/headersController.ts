import { Request, Response } from 'express'
import { Headers } from '../models/models.js'

class HeadersController {

  async create(req: Request, res: Response) {
    const {name, subject} = req.body
    const elems = await Headers.create({name, subject})
    return res.json(elems)
  }

  async getAll(req: Request, res: Response) {
    const elems = await Headers.findAll()
    return res.json(elems)
  }
}

export default new HeadersController()
