const mongoose = require('mongoose');

// creating schema for contact;
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    number: {
        type: String,
        required: true,

    }
});

//Now we need to tell what would be the name of collection(model) of this schema;

// here collection means contact_list in index.js :p

// whenever we create model name or collection name we should always uppercase first letter(naming convenction);
const Contact = mongoose.model('Contact', contactSchema);

// now we export
module.exports = Contact;