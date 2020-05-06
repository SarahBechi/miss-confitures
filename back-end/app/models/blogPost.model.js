const mongoose = require('mongoose');

const BlogPostSchema = mongoose.Schema({
    Post_Title: { type: String },
    Post_Date: { type: String },
    Post_Body: { type: String },

    Link_Img: { type: String }

}, {
    timestamps: true
},

    { collection: 'BlogPostlist' }

);

module.exports = mongoose.model('BlogPost', BlogPostSchema);