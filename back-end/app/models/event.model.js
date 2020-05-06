const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    Event_Name: { type: String },
    Event_Date: { type: String },
    Event_Hour: { type: String },
    Event_Place: { type: String },
    Event_Description: { type: String },
    Link_Img: { type: String }

}, {
    timestamps: true
},

    { collection: 'Eventlist' }

);

module.exports = mongoose.model('Event', EventSchema);