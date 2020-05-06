module.exports = (app) => {
    const Entrepreneur = require('../controllers/entrepreneur.controller');
    const multer = require('multer');
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '../public/upload');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });

    const fileFilter = (req, file, cb) => {
        // reject a file
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };

    const upload = multer({
        storage: storage,
    });

    app.post("/add_entrepreneur", upload.single('Link_Img'), Entrepreneur.create);

    app.get("/find_entrepreneur/:id", Entrepreneur.FindID);

    app.get("/find_entrepreneurs/", Entrepreneur.FindAll);

    app.put('/update_entrepreneur/:id', upload.single('Link_Img'), Entrepreneur.Update)

    app.delete('/delete_entrepreneur/:id', Entrepreneur.delete)


}