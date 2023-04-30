import { NextFunction, Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import ApiError from '../controllers/apiError.js'
import { Images } from '../models/models.js'
import { __dirname } from '../index.js'

class ImagesController {

  async addImage(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files) {
        return next(ApiError.badRequest('No file uploaded.'))
      }

      const file = req.files.file as UploadedFile

      if (!file) {
        return next(ApiError.badRequest('Incorrect input data.'))
      }

      let fileName = uuidv4() + ".png"
      file.mv(path.resolve(__dirname, '..', 'static', fileName))

      const elem = await Images.create({imgName: fileName})
      return res.json(elem)
    }
    catch(err) {
      next(ApiError.badRequest(err.message))
      console.error(err)
    }
  }

}

export default new ImagesController()
