const Form = require('../models/Form')

const createForm = async (req, res) => {
    try {
        const { name, fields } = req.body;
        const userId = req.user.id;

        if (!name || !fields) {
            return res.status(400).json({ message: "Form name and fields are required." });
        }

        const newForm = await Form.create({ name, fields, userId });
        return res.status(201).json(newForm);
    } catch (error) {
        console.error("Error creating form:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateForm = async (req, res) => {
    try {
        const { formId } = req.params;
        const { name, fields } = req.body;

        const form = await Form.findByPk(formId);

        if (!form) {
            return res.status(404).json({ message: "Form not found." });
        }

        if (form.userId !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to update this form." });
        }

        form.name = name || form.name;
        form.fields = fields || form.fields;

        await form.save();
        return res.status(200).json(form);
    } catch (error) {
        console.error("Error updating form:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getFormDetails = async (req, res) => {
    try {
        const { formId } = req.params;

        const form = await Form.findByPk(formId);

        if (!form) {
            return res.status(404).json({ message: "Form not found." });
        }

        return res.status(200).json(form);
    } catch (error) {
        console.error("Error fetching form details:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const fetchFormsWithPagination = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const forms = await Form.findAndCountAll({
            where: { userId: req.user.id },
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [["createdAt", "DESC"]],
        });

        return res.status(200).json({
            total: forms.count,
            page: parseInt(page),
            pages: Math.ceil(forms.count / limit),
            forms: forms.rows,
        });
    } catch (error) {
        console.error("Error fetching forms with pagination:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { createForm, updateForm, getFormDetails, fetchFormsWithPagination };