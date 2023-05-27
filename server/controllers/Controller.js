const RegistrationFormModel = require('../models/RegistrationForm')
const Employee = require('../models/Employee')

// found employee base on employeeID
module.exports.getEmployee = async (req, res) => {
  const { employeeID } = req.params;

  try {
    const employee = await Employee.findOne({ employeeID });

    if (employee) {
      res.send(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    console.error(error);  // log the error to console  
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports.createAccount = async (req, res) => {
  const { fullName, email, password, dateOfBirth, gender, phoneNumber, address, state
    , position, department, employeeID, hkID } = req.body
  RegistrationFormModel.create({
    fullName, email, password, dateOfBirth, gender, phoneNumber, address, state
    , position, department, employeeID, hkID
  }).then((data) => {
    console.log("Added Successfully...");
    console.log(data);
    res.send(data)
  })
}
