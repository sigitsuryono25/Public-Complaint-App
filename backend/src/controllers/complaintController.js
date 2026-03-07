const { Complaint, User, Category, SKPD, ComplaintLog } = require('../models');

// @desc    Create new complaint
// @route   POST /api/complaints
const createComplaint = async (req, res) => {
    try {
        const { citizen_id, category_id, title, description, latitude, longitude, photo_url } = req.body;

        const complaint = await Complaint.create({
            citizen_id,
            category_id,
            title,
            description,
            latitude,
            longitude,
            photo_url,
        });

        // Initial log entry
        await ComplaintLog.create({
            complaint_id: complaint.id,
            status_to: 'SUBMITTED',
            notes: 'Initial submission',
        });

        res.status(201).json({ success: true, data: complaint });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all complaints (with filters)
// @route   GET /api/complaints
const getComplaints = async (req, res) => {
    try {
        const filters = {};
        if (req.query.status) filters.status = req.query.status;
        if (req.query.skpd_id) filters.skpd_id = req.query.skpd_id;
        if (req.query.category_id) filters.category_id = req.query.category_id;

        const complaints = await Complaint.findAll({
            where: filters,
            include: [
                { model: User, as: 'Citizen', attributes: ['name', 'email'] },
                { model: Category, attributes: ['name'] },
                { model: SKPD, attributes: ['name'] }
            ],
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({ success: true, count: complaints.length, data: complaints });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single complaint details with logs
// @route   GET /api/complaints/:id
const getComplaintById = async (req, res) => {
    try {
        const complaint = await Complaint.findByPk(req.params.id, {
            include: [
                { model: User, as: 'Citizen', attributes: ['name', 'email'] },
                { model: Category, attributes: ['name'] },
                { model: SKPD, attributes: ['name'] },
                { model: ComplaintLog, order: [['created_at', 'DESC']] }
            ]
        });

        if (!complaint) {
            return res.status(404).json({ success: false, message: 'Complaint not found' });
        }

        res.status(200).json({ success: true, data: complaint });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update complaint status
// @route   PATCH /api/complaints/:id/status
const updateComplaintStatus = async (req, res) => {
    try {
        const { status, notes, skpd_id } = req.body;
        const complaint = await Complaint.findByPk(req.params.id);

        if (!complaint) {
            return res.status(404).json({ success: false, message: 'Complaint not found' });
        }

        const oldStatus = complaint.status;
        complaint.status = status;
        if (skpd_id) complaint.skpd_id = skpd_id;
        await complaint.save();

        // Log the change
        await ComplaintLog.create({
            complaint_id: complaint.id,
            status_from: oldStatus,
            status_to: status,
            notes: notes || 'Status updated by system/admin',
        });

        res.status(200).json({ success: true, data: complaint });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = {
    createComplaint,
    getComplaints,
    getComplaintById,
    updateComplaintStatus,
};
