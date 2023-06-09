import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/models.js'

interface JwtPayload {
	role: string
}

const roleCheckMiddleware = function (role: string) {
	return function (req: Request, res: Response, next: NextFunction) {
		if (req.method === 'OPTIONS') {
			next()
		}
		try {
			const token = req.headers.authorization.split(' ')[1]
			if (!token) {
				return res.status(401).json({ message: 'Not authorized[1].' })
			}
			const decoded = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload
			if (decoded.role !== role) {
				return res.status(403).json({ message: 'No access.' })
			}
			req.user = decoded as UserModel
			next()
		} catch (err) {
			res.status(401).json({ message: 'Not authorized[2].' })
		}
	}
}

export default roleCheckMiddleware
