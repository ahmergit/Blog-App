const mongoose = require('mongoose');

const {Schema} = mongoose;

const blogSehema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    photoPath: {type: String, required: true},
    author: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'}
},
    {timestamps: true}

);

module.exports = mongoose.model('Blog', blogSehema, 'blogs')