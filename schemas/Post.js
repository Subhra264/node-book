const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const Post = new Schema({
    body: {
        required: true,
        type: String
    },
    image: {
        required: false,
        type: String
    },
    date: {
        required:true,
        type: Date,
        default: Date.now()
    },
    postedBy : {
        required: true,
        type: Schema.Types.ObjectId,
        ref: User
    }
});


module.exports = mongoose.model("Post", Post);