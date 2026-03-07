const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Category = require('./Category');
const SKPD = require('./SKPD');

const Complaint = sequelize.define('Complaint', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    citizen_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: User, key: 'id' },
    },
    category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: Category, key: 'id' },
    },
    skpd_id: {
        type: DataTypes.UUID,
        allowNull: true, // Can be assigned later by admin
        references: { model: SKPD, key: 'id' },
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    photo_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('SUBMITTED', 'VERIFIED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'),
        defaultValue: 'SUBMITTED',
    },
}, {
    tableName: 'complaints',
    timestamps: true,
    underscored: true,
});

module.exports = Complaint;
