module.exports = (app) => {
    const Product = require('../controllers/product.controller');
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

    app.post("/add_product", upload.single('Link_Img'), Product.create);

    app.get("/find_product/:id", Product.FindID);

    app.get("/find_products", Product.FindAll);

    app.put('/update_product/:id', upload.single('Link_Img'), Product.Update)

    app.delete('/delete_product/:id', Product.delete)

    app.get('/sortName', Product.SortName)

}