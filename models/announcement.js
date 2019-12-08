const mongoose = require('mongoose');
const Joi = require('joi');


const Schema = mongoose.Schema;

const announcementSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    content: {
        required: true,
        type: String,
    }, category: {
        required: true,
        type: String, enum: ['buying', 'selling']
    },
    expirationDate: {
        required: true,
        type: Date,
    },
}, {
    timestamps: true
});


function validateAnnouncement(announcement) {
    const announcementSchema = {
        name: Joi.string().min(1).max(255).required(),
        email: Joi.string().email().min(1).max(255).required(),
        content: Joi.string().min(1).max(255).required(),
        category: Joi.string().valid(['buying', 'selling']).required(),
        expirationDate: Joi.date().required(),
    };
    return Joi.validate(announcement, announcementSchema);
}

exports.validate = validateAnnouncement;
exports.Announcement = mongoose.model('Announcement', announcementSchema);
