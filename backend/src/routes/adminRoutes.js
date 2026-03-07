const express = require('express');
const router = express.Router();
const {
    createCategory,
    getCategories,
    createSKPD,
    getSKPDs,
} = require('../controllers/adminController');

// Categories
router.post('/categories', createCategory);
router.get('/categories', getCategories);

// SKPD
router.post('/skpds', createSKPD);
router.get('/skpds', getSKPDs);

module.exports = router;
