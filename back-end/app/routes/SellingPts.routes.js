module.exports = (app) => {
    const SellingPt = require('../controllers/SellingPts.controller');
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

    app.post("/add_sellingpt", upload.single('Link_Img'), SellingPt.create);

    app.get("/find_sellingpt/:id", SellingPt.FindID);

    app.get("/find_sellingpts/", SellingPt.FindAll);

    app.put('/update_sellingpt/:id', upload.single('Link_Img'), SellingPt.Update)

    app.delete('/delete_sellingpt/:id', SellingPt.delete)


}