module.exports = (app) => {
    const Event = require('../controllers/event.controller');
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

    app.post("/add_event", upload.single('Link_Img'), Event.create);

    app.get("/find_event/:id", Event.FindID);

    app.get("/find_events/", Event.FindAll);

    app.put('/update_event/:id', upload.single('Link_Img'), Event.Update)

    app.delete('/delete_event/:id', Event.delete)


}