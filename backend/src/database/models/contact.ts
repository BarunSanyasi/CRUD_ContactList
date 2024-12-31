import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface ContactAttributes {
    id: number;
    name: string;
    email: string;
    phone: string;
}

interface ContactCreationAttribtes extends Optional<ContactAttributes, 'id'> {}
class Contact extends Model<ContactAttributes, ContactCreationAttribtes> implements ContactAttributes{
    public id!: number;
    public name!: string;
    public email!: string;
    public phone!: string;
}

export default (sequelize: Sequelize) => {
    Contact.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {sequelize, modelName: 'Contact'}

    );
    return Contact;
};