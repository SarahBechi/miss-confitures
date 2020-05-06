
const OrdersController = require('../controllers/order_controller');
module.exports = (app) => {
    // Handle incoming GET requests to /orders
    app.get("/get_order", OrdersController.orders_get_all);

    app.post("/add_order", OrdersController.orders_create_order);

    app.get("/get_order/:orderId", OrdersController.orders_get_order);

    app.delete("/delete_order/:orderId", OrdersController.orders_delete_order);

}