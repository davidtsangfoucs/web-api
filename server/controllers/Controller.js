const RegistrationFormModel = require('../models/RegistrationForm')
const ApplicationFormModel = require('../models/ApplicationForm')
const Employee = require('../models/Employee')
const Message = require('../models/MessageSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cat = require('../models/CatSchema'); // Path to your Cat model file

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
    , premission, department, employeeID, hkID, cartNum, clickedCards } = req.body
  RegistrationFormModel.create({
    fullName, email, password, dateOfBirth, gender, phoneNumber, address, state
    , premission, department, employeeID, hkID, cartNum, clickedCards
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
      premission: user.premission,
      employeeID: user.employeeID,
      _id: user._id,
      fullName: user.fullName,
      location: user.department
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

  const { fullName, email, dateOfBirth, gender, phoneNumber, address, cartNum, clickedCards } = req.body;

  try {
    const updatedAccount = await RegistrationFormModel.findByIdAndUpdate(req.params.objID, {
      fullName,
      email,
      dateOfBirth,
      gender,
      phoneNumber,
      address,
      cartNum,
      clickedCards
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


// found register acc base on employeeID
module.exports.getRegisterAcc = async (req, res) => {
  const { employeeID } = req.params;

  try {
    const employee = await RegistrationFormModel.findOne({ employeeID });

    if (employee) {
      // Create a payload for the token
      const payload = {
        employeeID: employee.employeeID,
        fullName: employee.fullName,
        premission: employee.premission,
        // add any other employee data that you want included in the JWT
      };

      // Sign the token
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send the token and employee data in the response
      res.json({ token, employee });
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    console.error(error);  // log the error to console  
    res.status(500).json({ error: 'Server error' });
  }
};


// auth form google 
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("1061523075573-n537pria7u9k24et8osc54cop29krk3c.apps.googleusercontent.com");

module.exports.verifyIdToken = async (req, res) => {
  const token = req.body.idToken;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "1061523075573-n537pria7u9k24et8osc54cop29krk3c.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();

    // Do whatever you want with the user information in payload

    res.json({ verified: true });
  } catch (e) {
    res.json({ verified: false });
  }
}


// get cats 

module.exports.getCats = async (req, res) => {
  try {
    const cats = await Cat.find();
    res.json(cats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports.addCat = async (req, res) => {
  try {
    const newCat = new Cat({
      name: req.body.name,
      breed: req.body.breed,
      age: req.body.age,
      ageUnit: req.body.ageUnit,
      description: req.body.description,
      location: req.body.location,
      image: req.body.image
    });

    let cat = await newCat.save();

    if (!cat) throw Error('Something went wrong saving the cat');

    res.status(200).json(cat);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

// updateCat
module.exports.updateCat = async (req, res) => {
  try {
    const updatedCat = await Cat.findByIdAndUpdate(req.params.catId, req.body, { new: true });
    res.json(updatedCat);
  } catch (error) {
    res.status(500).send('Error updating cat data: ' + error);
  }
};

module.exports.deleteCat = async (req, res) => {
  try {
    const deletedCat = await Cat.findByIdAndRemove(req.params.catId);
    res.json(deletedCat);
  } catch (error) {
    res.status(500).send('Error deleting cat data: ' + error);
  }
};


// get fav cats
module.exports.getFavCats = async (req, res) => {
  const { employeeID } = req.params;

  try {
    const employee = await RegistrationFormModel.findOne({ employeeID });

    if (employee) {
      const clickedCards = employee.clickedCards;
      res.json({ clickedCards });
    } else {
      // Handle the case when the employee is not found
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error, getFavCats' });
  }
};

module.exports.deleteFavCat = async (req, res) => {
  const { employeeID, catID } = req.params;

  try {
    const employee = await RegistrationFormModel.findOne({ employeeID });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Find the index of the cat ID in the clickedCards array
    const catIndex = employee.clickedCards.indexOf(catID);

    // Subtract 1 from the cartNum
    employee.cartNum = employee.cartNum - 1;

    if (catIndex === -1) {
      return res.status(404).json({ error: 'Cat not found in favorites' });
    }

    // Remove the cat ID from the clickedCards array
    employee.clickedCards.splice(catIndex, 1);

    // Save the updated employee document
    await employee.save();

    res.json({ message: 'Cat removed from favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error, deleteFavCat' });
  }
};

// MessageController.js


exports.createMessage = async (req, res) => {
  const { sender, receiver, content } = req.body;

  try {
    const message = new Message({ sender, receiver, content });
    await message.save();
    res.status(201).json({ message: 'Message sent successfully!', data: message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while sending the message.' });
  }
};


exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate('sender');
    res.status(200).json({ data: messages });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching messages.' });
  }
};


exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndDelete(id);
    res.status(200).json({ message: 'Message deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the message.' });
  }
};

exports.deleteOneMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndDelete(id);
    res.status(200).json({ message: 'Message deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the message.' });
  }
};


