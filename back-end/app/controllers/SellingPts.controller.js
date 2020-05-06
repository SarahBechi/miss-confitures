const SellingPt = require('../models/SellingPts.model');

exports.create = (req, res) => {
    const NewSellingPt = new SellingPt({
        SellingPt_Name: req.body.SellingPt_Name,
        SellingPt_Adresse: req.body.SellingPt_Adresse,
        Link_Img: req.file.originalname

    });
    NewSellingPt.save().then((data, err) => {
        if (err) console.log(err)
        else res.send(data)
    })

}

exports.FindID = (req, res) => {
    SellingPt.findById(req.params.id)
        .then(result => {
            if (result) res.status(200).json({
                _id: result._id,
                SellingPt_Name: result.SellingPt_Name,
                SellingPt_Adresse: result.SellingPt_Adresse,

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
    SellingPt.findOneAndUpdate({ _id: id }, {
        SellingPt_Name: req.body.SellingPt_Name,
        SellingPt_Adresse: req.body.SellingPt_Adresse,

        Link_Img: req.file.originalname
    })
        .then(SellingPt => { res.send(SellingPt) }).catch(err => {
            console.log(err)
            res.status(500).json({
                message: "error! "
            })
        })
}



exports.delete = (req, res) => {
    const contId = req.params.id
    SellingPt.findOneAndDelete({ _id: contId }).then(SellingPt => { res.send(SellingPt) })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "ERROR!" })
        })
}

exports.FindAll = (req, res) => {
    SellingPt.find()
        .then(result =>
            res.status(200).json((result)))
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Error Occured"
            })

        })
}