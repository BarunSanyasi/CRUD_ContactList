import { Sequelize } from "sequelize";
import ContactModel from './models/contact';
import UserModle from './models/User';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize( 
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
});

export const Contact = ContactModel(sequelize);
export const User = UserModle(sequelize);

//sequelize.sync();

sequelize.authenticate().then(() => console.log('Database connected'));