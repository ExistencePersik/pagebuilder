import DataTypes, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import sequelize from '../db.js'

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id: CreationOptional<number>
  email: string
  password: string
  role: string
}

interface ElementsModel extends Model<InferAttributes<ElementsModel>, InferCreationAttributes<ElementsModel>> {
  id: CreationOptional<number>
  name: string
  subject: JSON
}

const User = sequelize.define<UserModel>('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Headers = sequelize.define<ElementsModel>('headers', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false, unique: true},
  subject: {type: DataTypes.JSON, allowNull: false}
})

const Content = sequelize.define<ElementsModel>('content', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false, unique: true},
  subject: {type: DataTypes.JSON, allowNull: false}
})

const Footers = sequelize.define<ElementsModel>('footers', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false, unique: true},
  subject: {type: DataTypes.JSON, allowNull: false}
})

export {
  User,
  Headers,
  Content,
  Footers,
}
