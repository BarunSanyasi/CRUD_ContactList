import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface UserAttributes {
  id: number;
  name: string;
  email:string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string; 
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {sequelize, modelName: 'User'}
  );
  return User;
};
