const RegistrationFormModel = require('../models/RegistrationForm')
const ApplicationFormModel = require('../models/ApplicationForm')
const Employee = require('../models/Employee')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

// Login 
module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch the user data from the database
    const user = await RegistrationFormModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Create a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });

    // Send the token and user data in the response
    res.json({
      token,
      position: user.position,
      employeeID: user.employeeID
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// create applicaiton   
module.exports.createApplication = async (req, res) => {
  const {
    applicationId,
    englishName,
    chineseName,
    gender,
    dob,
    address,
    pob,
    availableDate,
    timeSlot,
    vaccineBrand,
    venue } = req.body
  ApplicationFormModel.create({
    applicationId,
    englishName,
    chineseName,
    gender,
    dob,
    address,
    pob,
    availableDate,
    timeSlot,
    vaccineBrand,
    venue
  }).then((data) => {
    console.log("Added Successfully...");
    console.log(data);
    res.send(data)
  })
}


// get application list to show in table 
module.exports.getApplicationList = async (req, res) => {
  try {
    const applications = await ApplicationFormModel.find();

    if (applications.length > 0) {
      res.send(applications);
    } else {
      res.status(404).json({ error: 'No applications found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

