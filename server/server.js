const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Customer API",
            description: "Customer API Information",
            contact: {
                name: "Amazing Developer"
            },
            servers: ["http://localhost:3006"]
        }
    },
    // ['.routes/*.js']
    apis: ['./routes/Routes.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(routes)

app.listen(PORT, () => console.log(`Listening on: ${PORT}`))
