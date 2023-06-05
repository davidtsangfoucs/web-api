const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeID: { type: String, required: true },
    premission: { type: String, required: true },
    department: { type: String, required: true },
    // Other employee fields...
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
