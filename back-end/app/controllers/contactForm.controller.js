const ContactForm = require('../models/contactForm.model');

exports.create = (req, res) => {
    const NewContactForm = new ContactForm({
        Name: req.body.Name,
        Company: req.body.Company,
        ContactEmail: req.body.ContactEmail,
        ContactPhoneNumber: req.body.ContactPhoneNumber,
        MessageObject: req.body.MessageObject,
        Message: req.body.Message

    });
    NewContactForm.save().then((data, err) => {
        if (err) console.log(err)
        else res.send(data)
    })

}

exports.FindID = (req, res) => {
    ContactForm.findById(req.params.id)
        .then(result => {
            if (result) res.status(200).json({
                _id: result._id,
                Name: result.Name,
                Company: result.Company,
                ContactEmail: result.ContactEmail,
                ContactPhoneNumber: result.ContactPhoneNumber,
                MessageObject: result.MessageObject,
                Message: result.Message,

            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Error Occured!"
            })

        })
}



exports.delete = (req, res) => {
    const contId = req.params.id
    ContactForm.findOneAndDelete({ _id: contId }).then(ContactForm => { res.send(ContactForm) })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "ERROR!" })
        })
}

exports.FindAll = (req, res) => {
    ContactForm.find()
        .then(result =>
            res.status(200).json((result)))
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Error Occured"
            })

        })
}