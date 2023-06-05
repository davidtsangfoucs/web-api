const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const registrationSchema = new Schema({
    fullName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String },
    state: { type: String, required: true },
    premission: { type: String, required: true },
    department: { type: String, required: true },
    employeeID: {
        type: String,
        required: true
    },
    hkID: {
        type: String,
        required: true
    },
    failedAttempts: {
        type: Number,
        required: true,
        default: 0
      },
      lastFailedAttempt: {
        type: Date,
        required: true,
        default: Date.now
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
