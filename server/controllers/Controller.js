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
// Login 
module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch the user data from the database
    const user = await RegistrationFormModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If the user has failed to login more than 5 times
    if (user.failedAttempts >= 5) {
      // Check if 15 minutes have passed since the last failed attempt
      const timeDiff = Date.now() - user.lastFailedAttempt;
      // stop 15mins 
      if (timeDiff < 15 * 60 * 1000) {
        return res.status(400).json({ message: 'Too many failed attempts. Please try again later.' });

        // stop 10s for demo
        // if (timeDiff < 1 * 10 * 1000) {
        //   return res.status(400).json({ message: 'Too many failed attempts. Please try again later.' });
      } else {
        // Reset the failed attempts if 15 minutes have passed
        user.failedAttempts = 0;
        await user.save();
      }
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      user.failedAttempts += 1;
      user.lastFailedAttempt = Date.now();
      await user.save();
      return res.status(400).json({ message: 'Invalid password' });
    }

    // If login is successful, reset failedAttempts
    user.failedAttempts = 0;
    await user.save();

    // Create a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

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


// get registar acc from employee list to show in table 
module.exports.getAccountsList = async (req, res) => {
  try {
    const accounts = await RegistrationFormModel.find();

    if (accounts.length > 0) {
      res.send(accounts);
    } else {
      res.status(404).json({ error: 'No accounts found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports.updateAccount = async (req, res) => {

  const { fullName, email, dateOfBirth, gender, phoneNumber, address } = req.body;

  try {
    const updatedAccount = await RegistrationFormModel.findByIdAndUpdate(req.params.employeeID, {
      fullName,
      email,
      dateOfBirth,
      gender,
      phoneNumber,
      address
    }, { new: true });

    if (updatedAccount) {
      res.send(updatedAccount);
    } else {
      res.status(404).json({ error: 'Account not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports.deleteAccount = async (req, res) => {

  try {
    const deletedAccount = await RegistrationFormModel.findByIdAndDelete(req.params.employeeID);

    if (deletedAccount) {
      res.send({ message: 'Account deleted successfully' });
    } else {
      res.status(404).json({ error: 'Account not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};