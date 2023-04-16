import { Request, Response } from 'express'
import { Headers, Content, Footers } from '../models/models.js'

class ElementsController {
  async getAll(req: Request, res: Response) {
    const headers = await Headers.findAll()
    const content = await Content.findAll()
    const footers = await Footers.findAll()
    return res.json({headers, content, footers})
  }
}

export default new ElementsController()
