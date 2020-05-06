const Entrepreneur = require('../models/entrepreneur.model');

exports.create = (req, res) => {
    const NewEntrepreneur = new Entrepreneur({
        Entrepreneur_Name: req.body.Entrepreneur_Name,
        Entrepreneur_Description: req.body.Entrepreneur_Description,
        Social_Links: req.body.Social_Links,
        Link_Img: req.file.originalname

    });
    NewEntrepreneur.save().then((data, err) => {
        if (err) console.log(err)
        else res.send(data)
    })

}

exports.FindID = (req, res) => {
    Entrepreneur.findById(req.params.id)
        .then(result => {
            if (result) res.status(200).json({
                _id: result._id,
                Entrepreneur_Name: result.Entrepreneur_Name,
                Entrepreneur_Description: result.Entrepreneur_Description,
                Social_Links: result.Social_Links,
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
    Entrepreneur.findOneAndUpdate({ _id: id }, {
        Entrepreneur_Name: req.body.Entrepreneur_Name,
        Entrepreneur_Description: req.body.Entrepreneur_Description,
        Social_Links: req.body.Social_Links,
        Link_Img: req.file.originalname
    })
        .then(Entrepreneur => { res.send(Entrepreneur) }).catch(err => {
            console.log(err)
            res.status(500).json({
                message: "error! "
            })
        })
}



exports.delete = (req, res) => {
    const contId = req.params.id
    Entrepreneur.findOneAndDelete({ _id: contId }).then(Entrepreneur => { res.send(Entrepreneur) })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "ERROR!" })
        })
}

exports.FindAll = (req, res) => {
    Entrepreneur.find()
        .then(result =>
            res.status(200).json((result)))
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Error Occured"
            })

        })
}