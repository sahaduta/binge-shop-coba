const { Model,DataTypes } = require("sequelize");
const sequelize = require('./sequelize');

class User extends Model {
    
}

User.init(
    {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
          },
        fullname: {
          type: DataTypes.STRING,
          allowNull: true
        },
        address: {
          type: DataTypes.STRING,
          allowNull: true
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false
        }
    },
    {
        sequelize: sequelize,
        timestamps: true,
        paranoid: true,
        underscored: true
    },
)

module.exports = User;