const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Complaint = require('./Complaint');

const ComplaintLog = sequelize.define('ComplaintLog', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    complaint_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: Complaint, key: 'id' },
    },
    status_from: {
        type: DataTypes.STRING,
        allowNull: true, // Only for first state
    },
    status_to: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'complaint_logs',
    timestamps: true,
    underscored: true,
});

module.exports = ComplaintLog;
