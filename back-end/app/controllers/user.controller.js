const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
//signin
exports.create = (req, res) => {
    User.find({ Email: req.body.Email })
        .exec()
        .then(user => {

            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Email already exists, please enter another one "
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.send({
                            error: err,
                            message: "user not found"
                        });
                    } else {
                        const NewUser = new User({
                            _id: new mongoose.Types.ObjectId(),
                            First_Name: req.body.First_Name,
                            Last_Name: req.body.Last_Name,
                            Email: req.body.Email,
                            Phone_Number: req.body.Phone_Number,

                            password: hash//hashing pour protèger le mot de passe
                        });

                        NewUser.save().then((data, err) => {
                            if (err) console.log(err)
                            else res.status(200).json({
                                message: "user added"
                            })
                        })
                    }
                })
            }
        })
}

//login
exports.user_login = (req, res, next) => {
    User.find({ Email: req.body.Email })
        .exec()
        .then(user => {
            if (user.length < 1) {

                return res.status(401).json({
                    message: "Authentication has failed"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Authentication has failed"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            Email: user[0].Email,
                            userId: user[0]._id
                        }, "secret"
                        // {
                        //     expiresIn: "1 hour"//pour génèrer un nouveau token
                        // }
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






///////
exports.FindID = (req, res) => {
    User.findById(req.params.id)
        .then(result => {
            if (result) res.status(200).json({
                _id: result._id,
                First_Name: result.First_Name,
                Last_Name: result.Last_Name,
                Email: result.Email,
                Phone_Number: result.Phone_Number,

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
    User.findOneAndUpdate({ _id: id }, {
        First_Name: req.body.First_Name,
        Last_Name: req.body.Last_Name,
        Email: req.body.Email,
        Phone_Number: req.body.Phone_Number,
    })
        .then(User => { res.send(User) }).catch(err => {
            console.log(err)
            res.status(500).json({
                message: "error! "
            })
        })
}
exports.Update_phone = (req, res) => {
    const id = req.params.id
    User.findOneAndUpdate({ _id: id }, {
        $set: {

            Phone_Number: req.body.Phone_Number,
            Adress: req.body.Adress,
        }
    })
        .then(User => { res.send(User) }).catch(err => {
            console.log(err)
            res.status(500).json({
                message: "error! "
            })
        })
}





exports.delete = (req, res) => {
    const contId = req.params.id
    User.findOneAndDelete({ _id: contId }).then(User => { res.send(User) })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "ERROR!" })
        })
}


exports.FindAll = (req, res) => {
    User.find()
        .then(result =>
            res.status(200).json((result)))
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Error Occured"
            })

        })
}