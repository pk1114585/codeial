/* const mongoose =require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db= mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('Connected to MongoDB');
});


module.exports =db; */
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const mongoUrl = 'mongodb://localhost:27017/codeial_development';

// Create a MongoDB client promise
const mongoClientPromise = MongoClient.connect(mongoUrl, {
    // No need to specify useNewUrlParser and useUnifiedTopology
});

mongoose.connect(mongoUrl);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

module.exports = {
    db,
    mongoClientPromise
};
