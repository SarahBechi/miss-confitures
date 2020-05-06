const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    Product_Name: { type: String },
    Product_Category: { type: String },
    Price: { type: Number },
    Jar_Size: { type: Number },
    Description: { type: String },
    Link_Img: { type: String }
}, {
    timestamps: true
},

    { collection: 'productlist' }

);

module.exports = mongoose.model('Product', ProductSchema);

