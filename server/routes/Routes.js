const { Router } = require("express");
const { createAccount, getEmployee, login, createApplication, getApplicationList, getAccountsList, updateAccount, deleteAccount, getRegisterAcc, verifyIdToken, getCats, addCat, updateCat, deleteCat, getFavCats, deleteFavCat, createMessage, getMessages, deleteMessage, deleteOneMessage } = require("../controllers/Controller");

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
// get by objId id
router.put('/update-employees-accounts/:objID', updateAccount);
router.delete('/delete-employees-accounts/:employeeID', deleteAccount);

// Add new endpoint for token verification
router.post('/verify-id-token', verifyIdToken);

// get cat 
router.get('/get-cats', getCats);
router.post('/add-cat', addCat);
router.put('/update-cats/:catId', updateCat);
router.delete('/delete-cats/:catId', deleteCat);

// cartNum
router.get('/get-fav-cats/:employeeID', getFavCats);
router.delete('/delete-fav-cats/:employeeID/:catID', deleteFavCat);


// msg routes.js
router.post('/send-messages', createMessage);
router.get('/get-messages', getMessages);
router.delete('/delete-messages/:id', deleteMessage);

// msg delete by one msg 
router.delete('/delete-one-messages/:id', deleteOneMessage);




module.exports = router;