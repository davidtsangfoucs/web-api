const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const routes = require('./routes/Routes')

require('dotenv').config()

const app = express()
const PORT = process.env.port || 3006

app.use(express.json())
app.use(cors())

// mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(`Connected To MongoDB...`))
    .catch((err) => console.log(err))

app.use(routes)
app.listen(PORT, () => console.log(`Listening on: ${PORT}`))
