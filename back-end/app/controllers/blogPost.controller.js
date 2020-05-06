const BlogPost = require('../models/blogPost.model');

exports.create = (req, res) => {

    const NewBlogPost = new BlogPost({
        Post_Title: req.body.Post_Title,
        Post_Date: req.body.Post_Date,
        Post_Body: req.body.Post_Body,
        Link_Img: req.file.originalname

    });
    NewBlogPost.save().then((data, err) => {
        if (err) console.log(err)
        else res.send(data)
    })

}

exports.FindID = (req, res) => {
    BlogPost.findById(req.params.id)
        .then(result => {
            if (result) res.status(200).json({
                _id: result._id,
                Post_Title: result.Post_Title,
                Post_Date: result.Post_Date,
                Post_Body: result.Post_Body,
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
    BlogPost.findOneAndUpdate({ _id: id }, {
        Post_Title: req.body.Post_Title,
        Post_Date: req.body.Post_Date,
        Post_Body: req.body.Post_Body,

        Link_Img: req.file.originalname
    })
        .then(BlogPost => { res.send(BlogPost) }).catch(err => {
            console.log(err)
            res.status(500).json({
                message: "error! "
            })
        })
}



exports.delete = (req, res) => {
    const contId = req.params.id
    BlogPost.findOneAndDelete({ _id: contId }).then(BlogPost => { res.send(BlogPost) })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "ERROR!" })
        })
}

exports.FindAll = (req, res) => {
    BlogPost.find()
        .then(result =>
            res.status(200).json((result)))
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Error Occured"
            })

        })
}