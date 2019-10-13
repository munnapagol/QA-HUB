const mongoose = require('mongoose');

const MongoURI = require('../config/keys').MongoDBLocal.MongoURI;

mongoose.connect(MongoURI, { useNewUrlParser: true }, (err) => {
    if (err) console.log('MongoDB connection failed');
    console.log('MongoDB server connected');
});