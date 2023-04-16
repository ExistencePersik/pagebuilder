import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const roleCheckMiddleware = function(role: string) {
  return function(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      next()
    }
    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return res.status(401).json({message: 'Not authorized[1].'})
      }
      const decoded: any = jwt.verify(token, process.env.SECRET_KEY)
      if (decoded.role !== role) {
        return res.status(403).json({message: 'No access.'})
      }
      req.user = decoded
      next()
    }
    catch (err) {
      res.status(401).json({message: 'Not authorized[2].'})
    }
  }
}

export default roleCheckMiddleware
