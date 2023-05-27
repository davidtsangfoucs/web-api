const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const registrationSchema = new Schema({
    fullName: { type: String, required: true },
    email: {
        type: String,
        required: true
    },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    employeeID: {
        type: String,
        required: true
    },
    hkID: {
        type: String,
        required: true
    }
});

// Hash passwords before saving
registrationSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
    }
    next();
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
