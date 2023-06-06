const { Router } = require("express");
const { createAccount, getEmployee, login, createApplication, getApplicationList, getAccountsList, updateAccount, deleteAccount, getRegisterAcc, verifyIdToken } = require("../controllers/Controller");

const router = Router()



// Registaration Form
// router.get('/', getProduct)
router.post('/create-account', createAccount)
router.get('/get-employees/:employeeID', getEmployee);

// Login 
router.post('/login', login);

// application 
router.post('/create-application', createApplication)
router.get('/get-applicationList', getApplicationList)

// get registration staff table
router.get('/get-employees-accounts/:employeeID', getRegisterAcc);
router.get('/get-employees-accounts', getAccountsList)
router.put('/update-employees-accounts/:employeeID', updateAccount);
router.delete('/delete-employees-accounts/:employeeID', deleteAccount);

// Add new endpoint for token verification
router.post('/verify-id-token', verifyIdToken);

module.exports = router;