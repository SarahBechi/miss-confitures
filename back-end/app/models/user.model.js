const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    First_Name: { type: String },
    Last_Name: { type: String },
    Email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String },
    Phone_Number: { type: Number },
    Adress: { type: String }
}, {
    timestamps: true
},

    { collection: 'userlist' }


);

module.exports = mongoose.model('User', UserSchema);





