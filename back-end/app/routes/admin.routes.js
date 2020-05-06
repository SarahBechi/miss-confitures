module.exports = (app) => {
    const Admin = require('../controllers/admin.controller');
    const checkAuth = require('../middelware/check_auth');//pour protéger les routes

    app.post("/signinadmin", Admin.create);

    app.post("/loginadmin", Admin.admin_login);

    app.get("/find_admin/:id", checkAuth, Admin.FindID);

    app.get("/find_admins/", checkAuth, Admin.FindAll);

    app.put('/update_admin/:id', Admin.Update)

    app.delete('/delete_admin/:id', Admin.delete)


}