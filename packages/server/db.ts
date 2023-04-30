import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_URL,
  {
    dialect: 'postgres'
  }
)

export default sequelize
