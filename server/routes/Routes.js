const { Router } = require("express");
const { createAccount, getEmployee, login, createApplication, getApplicationList, getAccountsList, updateAccount, deleteAccount, getRegisterAcc, verifyIdToken, getCats, addCat, updateCat, deleteCat, getFavCats, deleteFavCat, createMessage, getMessages, deleteMessage, deleteOneMessage } = require("../controllers/Controller");

const router = Router()
/**
 * @swagger
 * /create-account:
 *  post:
 *    description: Endpoint to create a new account
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              fullName:
 *                type: string
 *                description: The full name of the user.
 *              email:
 *                type: string
 *                description: The email address of the user.
 *              password:
 *                type: string
 *                description: The password for the user's account.
 *              dateOfBirth:
 *                type: string
 *                format: date
 *                description: The date of birth of the user.
 *              gender:
 *                type: string
 *                description: The gender of the user.
 *              phoneNumber:
 *                type: string
 *                description: The phone number of the user.
 *              address:
 *                type: string
 *                description: The address of the user.
 *              state:
 *                type: string
 *                description: The state of residence of the user.
 *              premission:
 *                type: string
 *                description: The permission level of the user.
 *              department:
 *                type: string
 *                description: The department of the user.
 *              employeeID:
 *                type: string
 *                description: The employee ID of the user.
 *              hkID:
 *                type: string
 *                description: The HK ID of the user.
 *              cartNum:
 *                type: number
 *                description: The cart number of the user.
 *              clickedCards:
 *                type: array
 *                items:
 *                  type: string
 *                description: The array of clicked cards by the user.
 *    responses:
 *      '200':
 *        description: A successful response indicating an account was created.
 */

router.post('/create-account', createAccount);

/**
 * @swagger
 * /get-employees/{employeeID}:
 *  get:
 *    description: Endpoint to get employee details
 *    parameters:
 *      - name: employeeID
 *        in: path
 *        description: ID of the employee to return
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A successful response returning employee details
 *      '404':
 *        description: No employee found with the provided ID
 */
router.get('/get-employees/:employeeID', getEmployee);

/**
 * @swagger
 * /login:
 *   post:
 *     description: Endpoint for user login
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       '200':
 *         description: Successful login
 *       '400':
 *         description: Login failed
 */
router.post('/login', login);

/**
 * @swagger
 * /get-employees-accounts/{employeeID}:
 *  get:
 *    description: Get registered employee details and generate a token
 *    parameters:
 *    - in: path
 *      name: employeeID
 *      required: true
 *      schema:
 *        type: string
 *      description: The employee ID
 *    responses:
 *      '200':
 *        description: A successful response with a generated token and employee data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                  description: JWT token for authentication
 *                employee:
 *                  $ref: '#/components/schemas/Employee'
 *      '404':
 *        description: Employee not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message
 *      '500':
 *        description: Server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message
 */

router.get('/get-employees-accounts/:employeeID', getRegisterAcc);

/**
 * @swagger
 * /get-employees-accounts:
 *   get:
 *     summary: Get list of all employee accounts
 *     description: Returns a list of all employee accounts.
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EmployeeAccount'
 *       '404':
 *         description: No accounts found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/get-employees-accounts', getAccountsList)

/**
 * @swagger
 * /update-employees-accounts/{objID}:
 *   put:
 *     summary: Update employee account
 *     description: Updates an employee's account with the provided data.
 *     parameters:
 *       - in: path
 *         name: objID
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee ID
 *       - in: body
 *         name: employeeData
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             fullName:
 *               type: string
 *             email:
 *               type: string
 *             dateOfBirth:
 *               type: string
 *               format: date
 *             gender:
 *               type: string
 *             phoneNumber:
 *               type: string
 *             address:
 *               type: string
 *             cartNum:
 *               type: number
 *             clickedCards:
 *               type: array
 *               items:
 *                 type: string
 *         description: The data to update the employee account
 *     responses:
 *       '200':
 *         description: The updated employee account
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeAccount'
 *       '404':
 *         description: Account not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.put('/update-employees-accounts/:objID', updateAccount);

/**
 * @swagger
 * /delete-employees-accounts/{employeeID}:
 *  delete:
 *    summary: Delete employee account
 *    description: Deletes an employee account based on the provided employee ID.
 *    parameters:
 *      - in: path
 *        name: employeeID
 *        required: true
 *        schema:
 *          type: string
 *        description: The employee ID
 *    responses:
 *      '200':
 *        description: Account deleted successfully
 *      '404':
 *        description: Account not found
 *      '500':
 *        description: Server error
 */
router.delete('/delete-employees-accounts/:employeeID', deleteAccount);

/**
 * @swagger
 * /verify-id-token:
 *  post:
 *    description: Endpoint for ID token verification
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              idToken:
 *                type: string
 *                description: The ID token to verify
 *            example:
 *              idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6Ij..."
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                verified:
 *                  type: boolean
 *                  description: Verification status
 *            example:
 *              verified: true
 *      '500':
 *        description: Server error
 */
router.post('/verify-id-token', verifyIdToken);

/**
 * @swagger
 * /get-cats:
 *  get:
 *    description: Use to fetch all cats
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                required:
 *                  - name
 *                  - breed
 *                  - age
 *                  - ageUnit
 *                  - description
 *                  - location
 *                  - image
 *                properties:
 *                  name:
 *                    type: string
 *                  breed:
 *                    type: string
 *                  age:
 *                    type: number
 *                  ageUnit:
 *                    type: string
 *                  description:
 *                    type: string
 *                  location:
 *                    type: string
 *                  image:
 *                    type: string
 *      '500':
 *        description: Server error
 */

router.get('/get-cats', getCats);

/**
 * @swagger
 * /add-cat:
 *  post:
 *    description: Use to add a new cat
 *    parameters:
 *      - name: cat
 *        in: body
 *        description: The cat to add
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - breed
 *            - age
 *            - ageUnit
 *            - description
 *            - location
 *            - image
 *          properties:
 *            name:
 *              type: string
 *            breed:
 *              type: string
 *            age:
 *              type: number
 *            ageUnit:
 *              type: string
 *            description:
 *              type: string
 *            location:
 *              type: string
 *            image:
 *              type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/add-cat', addCat);

/**
 * @swagger
 * /update-cats/{catId}:
 *   put:
 *     summary: Update cat details
 *     description: Updates the details of a cat based on its ID.
 *     parameters:
 *       - in: path
 *         name: catId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the cat to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               breed:
 *                 type: string
 *               age:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       '200':
 *         description: The cat details were updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 breed:
 *                   type: string
 *                 age:
 *                   type: string
 *                 location:
 *                   type: string
 *                 description:
 *                   type: string
 *                 image:
 *                   type: string
 *       '404':
 *         description: Cat not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.put('/update-cats/:catId', updateCat);


/**
 * @swagger
 * /delete-cats/{catId}:
 *  delete:
 *    summary: Delete a cat
 *    description: Deletes a cat based on the provided catId.
 *    parameters:
 *      - in: path
 *        name: catId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the cat to delete
 *    responses:
 *      '200':
 *        description: Cat successfully deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Cat deleted successfully
 *      '500':
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Error deleting cat data: <error message>
 */
router.delete('/delete-cats/:catId', deleteCat);


/**
 * @swagger
 * /get-fav-cats/{employeeID}:
 *   get:
 *     summary: Fetch favorite cats of an employee
 *     description: Use this API to retrieve the favorite cats of an employee based on their employee ID.
 *     parameters:
 *       - name: employeeID
 *         in: path
 *         description: ID of the employee
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clickedCards:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: ID of the clicked card
 *       '404':
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/get-fav-cats/:employeeID', getFavCats);

/**
 * @swagger
 * /delete-fav-cats/{employeeID}/{catID}:
 *   delete:
 *     description: Remove a cat from favorites
 *     parameters:
 *       - name: employeeID
 *         in: path
 *         description: ID of the employee
 *         required: true
 *         schema:
 *           type: string
 *       - name: catID
 *         in: path
 *         description: ID of the cat
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Cat removed successfully
 *       '404':
 *         description: Employee not found or Cat not found in favorites
 *       '500':
 *         description: Internal server error
 */
router.delete('/delete-fav-cats/:employeeID/:catID', deleteFavCat);

/**
 * @swagger
 * /send-messages:
 *  post:
 *    summary: Send a new message
 *    description: Endpoint to send a new message.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              sender:
 *                type: string
 *              receiver:
 *                type: string
 *              content:
 *                type: string
 *    responses:
 *      '201':
 *        description: Message sent successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                data:
 *                  $ref: '#/components/schemas/Message'
 *      '500':
 *        description: An error occurred while sending the message
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */
router.post('/send-messages', createMessage);

/**
 * @swagger
 * /get-messages:
 *  get:
 *    summary: Fetch all messages
 *    description: Use this endpoint to retrieve all messages.
 *    responses:
 *      '200':
 *        description: Successful response. Returns an array of messages.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Message'
 *              example:
 *                data: [
 *                  {
 *                    "_id": "60c8543fe8d1e827b8d97021",
 *                    "text": "Hello, how are you?",
 *                    "sender": {
 *                      "_id": "60c8543fe8d1e827b8d97020",
 *                      "name": "John Doe",
 *                      "email": "john@example.com"
 *                    },
 *                    "createdAt": "2023-06-15T10:00:00.000Z",
 *                    "updatedAt": "2023-06-15T10:00:00.000Z"
 *                  },
 *                  ...
 *                ]
 *      '500':
 *        description: Internal server error. An error occurred while fetching messages.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: An error occurred while fetching messages.
 */
router.get('/get-messages', getMessages);

/**
 * @swagger
 * /delete-messages/{id}:
 *   delete:
 *     summary: Delete a message by ID
 *     description: Deletes a message with the specified ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the message to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Message deleted successfully
 *       '500':
 *         description: An error occurred while deleting the message
 */
router.delete('/delete-messages/:id', deleteMessage);

/**
 * @swagger
 * /delete-one-messages/{id}:
 *  delete:
 *    summary: Delete a single message
 *    description: Deletes a single message based on its ID.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of the message to delete
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Message deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Success message
 *      '500':
 *        description: An error occurred while deleting the message
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message
 */
router.delete('/delete-one-messages/:id', deleteOneMessage);


module.exports = router;
