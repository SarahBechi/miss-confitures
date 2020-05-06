module.exports = (app) => {
    const Image = require('../controllers/gallery.controller')

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


    app.post("/add_image", upload.single('Img_Url'), Image.create);
    app.get("/find_image/:id", Image.FindID);
    app.get("/find_images", Image.FindAll);
    app.delete('/delete_image/:id', Image.delete)



}