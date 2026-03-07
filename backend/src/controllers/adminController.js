const { Category, SKPD } = require('../models');

// @desc    Create category
const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({ success: true, data: category });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({ include: [SKPD] });
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create SKPD
const createSKPD = async (req, res) => {
    try {
        const skpd = await SKPD.create(req.body);
        res.status(201).json({ success: true, data: skpd });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all SKPD
const getSKPDs = async (req, res) => {
    try {
        const skpds = await SKPD.findAll({ include: [Category] });
        res.status(200).json({ success: true, data: skpds });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createCategory,
    getCategories,
    createSKPD,
    getSKPDs,
};
