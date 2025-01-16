const mongoose = require("mongoose");

mongoose.set('debug', true);


const fileUploadSchema = new mongoose.Schema(
    {
        formId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        fieldId: {
            type: String,
            required: true,
        },
        fileName: {
            type: String,
            required: true,
        },
        fileData: {
            type: Buffer,
            required: true,
        },
        mimeType: {
            type: String,
            required: true,
        }
    },
    { timestamps: true },
    { collection: "FileStorage" }
);

const FileModel = mongoose.model("File", fileUploadSchema);

module.exports = FileModel;
