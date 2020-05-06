module.exports = (app) => {
    const ContactForm = require('../controllers/contactForm.controller');

    app.post("/add_contactform", ContactForm.create);

    app.get("/find_contactform/:id", ContactForm.FindID);

    app.get("/find_contactforms/", ContactForm.FindAll);


    app.delete('/delete_contactform/:id', ContactForm.delete)


}