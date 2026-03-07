const sequelize = require('../config/database');
const User = require('./User');
const Category = require('./Category');
const SKPD = require('./SKPD');
const Complaint = require('./Complaint');
const ComplaintLog = require('./ComplaintLog');

// Define Relationships
User.hasMany(Complaint, { foreignKey: 'citizen_id' });
Complaint.belongsTo(User, { as: 'Citizen', foreignKey: 'citizen_id' });

Category.hasMany(Complaint, { foreignKey: 'category_id' });
Complaint.belongsTo(Category, { foreignKey: 'category_id' });

Category.hasOne(SKPD, { foreignKey: 'category_id' });
SKPD.belongsTo(Category, { foreignKey: 'category_id' });

SKPD.hasMany(Complaint, { foreignKey: 'skpd_id' });
Complaint.belongsTo(SKPD, { foreignKey: 'skpd_id' });

Complaint.hasMany(ComplaintLog, { foreignKey: 'complaint_id' });
ComplaintLog.belongsTo(Complaint, { foreignKey: 'complaint_id' });

const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
        // In production, use migrations instead of { alter: true }
        if (process.env.NODE_ENV === 'development') {
            await sequelize.sync({ alter: true });
            console.log('Database synchronized.');
        }
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = {
    sequelize,
    User,
    Category,
    SKPD,
    Complaint,
    ComplaintLog,
    syncDatabase,
};
