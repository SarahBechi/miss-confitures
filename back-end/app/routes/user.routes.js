module.exports = (app) => {
    const User = require('../controllers/user.controller');
    const checkAuth = require('../middelware/check_auth');//pour protéger les routes

    app.post("/signin", User.create);

    app.post("/login", User.user_login);

    app.get("/find_user/:id", User.FindID);

    app.get("/find_users/", User.FindAll);
    app.put('/update_phone/:id', User.Update_phone)

    app.put('/update_user/:id', User.Update)

    app.delete('/delete_user/:id', User.delete)


}