const Field = require('../models/Field')


const createField = async (req, res) => {
    try {
        const { name, type, description } = req.body;
        const field = await Field.create({ name, type, description, createdBy: req.user.id });
        res.status(201).json(field);
    } catch (err) {
        res.status(500).json({ message: 'Error creating field', error: err.message });
    }
};


const getFields = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default to page 1, limit 10

    try {
        const offset = (page - 1) * limit;
        const fields = await Field.findAndCountAll({
            where: { createdBy: req.user.id },
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        res.json({
            fields: fields.rows,
            total: fields.count,
            page: parseInt(page),
            pages: Math.ceil(fields.count / limit),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch fields' });
    }
};


module.exports = { createField, getFields };