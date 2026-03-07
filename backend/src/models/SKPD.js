const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');

const SKPD = sequelize.define('SKPD', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    category_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: Category,
            key: 'id',
        },
    },
}, {
    tableName: 'skpds',
    timestamps: true,
    underscored: true,
});

module.exports = SKPD;
