module.exports = (app) => {
    const BlogPost = require('../controllers/blogPost.controller');
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

    app.post("/add_blogpost", upload.single('Link_Img'), BlogPost.create);

    app.get("/find_blogpost/:id", BlogPost.FindID);

    app.get("/find_blogposts/", BlogPost.FindAll);

    app.put('/update_blogpost/:id', upload.single('Link_Img'), BlogPost.Update)

    app.delete('/delete_blogpost/:id', BlogPost.delete)


}