const mongoose = require('mongoose');

const NewsletterSchema = mongoose.Schema({
    NSemail: {
        type: String,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },

}, {
    timestamps: true
},

    { collection: 'Newsletterlist' }

);

module.exports = mongoose.model('Newsletter', NewsletterSchema);