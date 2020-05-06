const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    Name: { type: String },
    Email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String },

}, {
    timestamps: true
},

    { collection: 'adminlist' }


);

module.exports = mongoose.model('Admin', AdminSchema);


