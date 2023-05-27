const { Router } = require("express");
const { createAccount, getEmployee, login, createApplication, getApplicationList } = require("../controllers/Controller");

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



module.exports = router;