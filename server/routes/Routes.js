const { Router } = require("express");
const { createAccount, getEmployee } = require("../controllers/Controller");

const router = Router()

// Registaration Form
// router.get('/', getProduct)
router.post('/create-account', createAccount)
router.get('/get-employees/:employeeID', getEmployee);



module.exports = router;