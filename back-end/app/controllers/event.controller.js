const Event = require('../models/event.model');

exports.create = (req, res) => {
    console.log(this.Event_Date)
    const NewEvent = new Event({
        Event_Name: req.body.Event_Name,
        Event_Date: req.body.Event_Date,
        Event_Hour: req.body.Event_Hour,
        Event_Place: req.body.Event_Place,
        Event_Description: req.body.Event_Description,
        Link_Img: req.file.originalname

    });
    NewEvent.save().then((data, err) => {
        if (err) console.log(err)
        else res.send(data)
    })

}

exports.FindID = (req, res) => {
    Event.findById(req.params.id)
        .then(result => {
            if (result) res.status(200).json({
                _id: result._id,
                Event_Name: result.Event_Name,
                Event_Date: result.Event_Date,
                Event_Hour: result.Event_Hour,
                Event_Place: result.Event_Place,
                Event_Description: result.Event_Description,
                Link_Img: result.Link_Img

            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Error Occured!"
            })

        })
}

exports.Update = (req, res) => {
    const id = req.params.id
    Event.findOneAndUpdate({ _id: id }, {
        Event_Name: req.body.Event_Name,
        Event_Date: req.body.Event_Date,
        Event_Hour: req.body.Event_Hour,
        Event_Place: req.body.Event_Place,
        Event_Description: req.body.Event_Description,
        Link_Img: req.file.originalname
    })
        .then(Event => { res.send(Event) }).catch(err => {
            console.log(err)
            res.status(500).json({
                message: "error! "
            })
        })
}



exports.delete = (req, res) => {
    const contId = req.params.id
    Event.findOneAndDelete({ _id: contId }).then(Event => { res.send(Event) })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "ERROR!" })
        })
}

exports.FindAll = (req, res) => {
    Event.find()
        .then(result =>
            res.status(200).json((result)))
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Error Occured"
            })

        })
}