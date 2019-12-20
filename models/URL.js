const mongoose = require('mongoose');
const { Schema } = mongoose;

//Create URL schema
const URLSchema = new Schema({
    inputUrl: {
        type: String,
        required:true
    },
    urlCode: {
        type: String
    },
    shortUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = URI = mongoose.model("uri",URLSchema);