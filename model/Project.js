const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    projectDetail: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: Date.now
    },
});

const Project = mongoose.model('Project', ProjectSchema);
module.exports = User;