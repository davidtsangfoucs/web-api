const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const applicationSchema = new Schema({
    applicationId: { type: String, required: true },
    englishName: { type: String, required: true },
    chineseName: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    address: { type: String, required: true },
    pob: { type: String, required: true },
    availableDate: { type: String, required: true },
    timeSlot: { type: String, required: true },
    vaccineBrand: { type: String, required: true },
    venue: { type: String, required: true }
});


const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
