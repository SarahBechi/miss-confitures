module.exports = (app) => {
    const Newsletter = require('../controllers/newsletter.controller');

    app.post("/add_newsletter", Newsletter.create);

    app.get("/find_newsletter/:id", Newsletter.FindID);

    app.get("/find_newsletters/", Newsletter.FindAll);


    app.delete('/delete_newsletter/:id', Newsletter.delete)


}