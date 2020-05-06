const Image = require('../models/gallery.model');


exports.create = (req, res) => {
    const NewImage = new Image({
        Img_Url: req.file.originalname,
        Img_Id: req.body.Img_Id,


    });
    NewImage.save().then((data, err) => {
        if (err) console.log(err)
        else res.send(data)
    })

}

exports.FindID = (req, res) => {
    Image.findById(req.params.id)
        .then(result => {
            if (result) res.status(200).json({
                _id: result._id,
                Img_Url: result.Img_Url,
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
    Image.findOneAndDelete({ _id: contId }).then(Image => { res.send(Image) })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "ERROR!" })
        })
}

exports.FindAll = (req, res) => {
    Image.find()
        .then(result =>
            res.status(200).json((result)))
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Error Occured"
            })

        })
}



