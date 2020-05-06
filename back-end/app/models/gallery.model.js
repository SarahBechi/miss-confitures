const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({

    Img_Url: { type: String },
    Img_Id: { type: String },


}, {
    timestamps: true
},

    { collection: 'gallery' }

);

module.exports = mongoose.model('Image', ImageSchema);