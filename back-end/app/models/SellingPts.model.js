const mongoose = require('mongoose');

const SellingPtSchema = mongoose.Schema({
    SellingPt_Name: { type: String },
    SellingPt_Adresse: { type: String },
    Link_Img: { type: String }

}, {
    timestamps: true
},

    { collection: 'SellingPtlist' }

);

module.exports = mongoose.model('SellingPt', SellingPtSchema);