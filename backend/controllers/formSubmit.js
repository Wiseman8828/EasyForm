const FormData = require('../models/FormData')
const connectMongoDB = require('../database/mongo');
const FileModel = require('../models/FileData')

const submitForm = async (req, res) => {
    connectMongoDB()
    try {
        const { formId } = req.params;
        const { email } = req.body;
        const files = req.files;
        const fieldData = JSON.parse(req.body.fieldData);

        if (!email) {
            return res.status(400).json({ message: "User email is required." });
        }

        const existingSubmission = await FormData.findOne({
            where: { formId, email },
        });

        if (existingSubmission) {
            return res.status(400).json({ message: "Form already submitted by this user." });
        }

        await FormData.create(
            { formId, email, fieldData }
        );

        if (files && files.length > 0) {
            const filePromises = files.map((file) => {
                const { fieldname, mimetype, buffer, originalname } = file;
                return FileModel.create({
                    formId,
                    userId: email,
                    fieldId: fieldname,
                    fileName: originalname,
                    fileData: buffer,
                    mimeType: mimetype
                });
            });

            await Promise.all(filePromises);
        }

        res.status(201).json({ message: "Form submitted successfully!" });
    } catch (error) {
        console.error("Error submitting form:", error);
        res.status(500).json({ message: "Internal Server Error. Please try again later." });
    }
};

module.exports = {
    submitForm
}
