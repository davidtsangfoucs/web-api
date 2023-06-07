const mongoose = require('mongoose');

const CatSchema = new mongoose.Schema({
    name: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }
});

const Cat = mongoose.model('Cat', CatSchema);

module.exports = Cat;
