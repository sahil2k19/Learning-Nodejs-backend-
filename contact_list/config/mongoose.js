
//require the library ('mongoose');
const mongoose = require('mongoose');

//connects to the database
mongoose.connect('mongodb://localhost/contacts_list_db');

//acquire the connection (to check if it is succesfull);
const db = mongoose.connection;

// if there is an error
db.on('error', console.error.bind(console, 'error connecting to db'));

//up and running then print the message
db.once('open', function () {
    console.log('successfully connected to the database ');

})