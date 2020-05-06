const mongoose = require('mongoose');

const ContactFormSchema = mongoose.Schema({
    Name: { type: String },
    Company: { type: String },
    ContactEmail: {
        type: String,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    ContactPhoneNumber: { type: Number },
    MessageObject: { type: String },
    Message: { type: String },

}, {
    timestamps: true
},

    { collection: 'ContactFormlist' }

);

module.exports = mongoose.model('ContactForm', ContactFormSchema);