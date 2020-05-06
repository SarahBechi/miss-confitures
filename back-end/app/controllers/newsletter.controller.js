const Newsletter = require('../models/newsletter.model');

exports.create = (req, res) => {

    const NvNewsletter = new Newsletter({

        NSemail: req.body.NSemail,
    });
    NvNewsletter.save().then((data, err) => {
        if (err) console.log(err)
        else res.send(data)
    })

}

exports.FindID = (req, res) => {
    Newsletter.findById(req.params.id)
        .then(result => {
            if (result) res.status(200).json({
                _id: result._id,
                NSemail: result.NSemail,


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
    Newsletter.findOneAndDelete({ _id: contId }).then(Newsletter => { res.send(Newsletter) })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "ERROR!" })
        })
}

exports.FindAll = (req, res) => {
    Newsletter.find()
        .then(result =>
            res.status(200).json((result)))
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Error Occured"
            })

        })
}