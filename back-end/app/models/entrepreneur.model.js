const mongoose = require('mongoose');

const EntrepreneurSchema = mongoose.Schema({
    Entrepreneur_Name: { type: String },
    Entrepreneur_Description: { type: String },
    Social_Links: { type: String },
    Link_Img: { type: String }

}, {
    timestamps: true
},

    { collection: 'Entrepreneurlist' }

);

module.exports = mongoose.model('Entrepreneur', EntrepreneurSchema);