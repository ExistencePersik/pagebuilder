import { Request, Response } from 'express'
import ApiError from '../controllers/apiError.js'

const errorMiddleware = function (err: Error, req: Request, res: Response) {
	if (err instanceof ApiError) {
		return res.status(err.status).json({ message: err.message })
	}

	return res.status(500).json({ message: 'Unexpected error.' })
}

export default errorMiddleware
