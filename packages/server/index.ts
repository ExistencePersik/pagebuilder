import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import path from 'path'
import { fileURLToPath } from 'url'
import router from './routes/index.js'
import errorMiddleware from './middleware/errorMiddleware.js'
import sequelize from './db.js'

dotenv.config()

declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
  interface Error {
    status?: number
  }
}

const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3200

const app = express()
app.use(cors({
  origin: [process.env.ORIGIN, process.env.ORIGIN_LOCAL]
}))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '..', 'static')))
app.use(fileUpload({}))
app.use('/api', router)

process.on('uncaughtException', function (err) {
  console.log(err)
})

app.use(errorMiddleware)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()

    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`)
    })
  }
  catch(err) {
    console.log(err)
  }
}

start()
