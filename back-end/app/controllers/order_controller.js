const mongoose = require("mongoose");

const Order = require("../models/order_model");
const Product = require("../models/product.model");
const User = require("../models/user.model");

exports.orders_get_all = (req, res, next) => {
    //filtrer les ordres selon l'ID du User
    Order.find()
        .select("product quantity user _id SubTotal")
        .populate("product")
        .populate("user")
        .exec()
        .then(docs => {
            res.send(docs)
            console.log(docs)

            // count: docs.length,
            // orders: docs.map(doc => {
            //     return {
            //         _id: doc._id,
            //         product: doc.product,
            //         quantity: doc.quantity,
            //         user: doc.user,

            //     };
            // })

        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.orders_create_order = (req, res, next) => {
    Product.findById(req.body.product)
        .then(data => {
            if (!data) {
                return res.status(404).json({
                    message: "Product not found"
                });
            } else {
                const order = new Order({
                    _id: mongoose.Types.ObjectId(),
                    quantity: req.body.quantity,
                    product: req.body.product,
                    user: req.body.user,
                    SubTotal: req.body.SubTotal
                });
                return order.save();
            }
        })
        .then(result => {

            res.status(201).json({
                message: "Order stored",
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity,
                    user: result.user,
                    SubTotal: result.SubTotal
                }

            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.orders_get_order = (req, res, next) => {
    Order.findById(req.params.orderId)
        .populate("product")
        .populate("user")
        .exec()
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: "Order not found"
                });
            }
            res.status(200).json({
                order: order,

            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.orders_delete_order = (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Order deleted",
                request: {

                    body: { product: "ID", quantity: "Number", user: "ID", SubTotal: "SubTotal" }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
