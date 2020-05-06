const Admin = require('../models/admin.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
//signin

exports.create = (req, res) => {
    Admin.find({ Email: req.body.Email })
        .exec()
        .then(admin => {
            if (admin.length >= 1) {
                return res.status(409).json({
                    message: "Email already exists, please enter another one "
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const NewAdmin = new Admin({
                            _id: new mongoose.Types.ObjectId(),
                            Name: req.body.Name,
                            Email: req.body.Email,
                            password: hash//hashing pour protèger le mot de passe
                        });

                        NewAdmin.save().then((data, err) => {
                            if (err) console.log(err)
                            else res.send(data)
                        })
                    }
                })
            }
        })
}


exports.admin_login = (req, res, next) => {
    Admin.find({ Email: req.body.Email })
        .exec()
        .then(admin => {

            // if (admin.length < 1) {
            //     return res.status(401).json({
            //         message: "Authentication has failed"
            //     });
            // }
            bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Authentication has failed"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            Email: admin[0].Email,
                            adminId: admin[0]._id
                        },
                        "secret",
                        {
                            expiresIn: "1 hour"//pour génèrer un nouveau token
                        }
                    );
                    return res.status(200).json({
                        message: "Authentication is successful",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Authentication has failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};







exports.FindID = (req, res) => {
    Admin.findById(req.params.id)
        .then(result => {
            if (result) res.status(200).json({
                _id: result._id,
                Name: result.Name,
                Email: result.Email,

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
    Admin.findOneAndUpdate({ _id: id }, {
        Name: req.body.Name,
        Email: req.body.Email,
    })
        .then(Admin => { res.send(Admin) }).catch(err => {
            console.log(err)
            res.status(500).json({
                message: "error! "
            })
        })
}





exports.delete = (req, res) => {
    const contId = req.params.id
    Admin.findOneAndDelete({ _id: contId }).then(Admin => { res.send(Admin) })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "ERROR!" })
        })
}


exports.FindAll = (req, res) => {
    Admin.find()
        .then(result =>
            res.status(200).json((result)))
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Error Occured"
            })

        })
}