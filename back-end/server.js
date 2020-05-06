const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

const app = express();
app.use(cors())



// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET
// });
// const storage = cloudinaryStorage({
//     cloudinary: cloudinary,
//     folder: "demo",
//     allowedFormats: ["jpg", "png"],
//     transformation: [{ width: 500, height: 500, crop: "limit" }]
// });
// const parser = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use('upload', express.static('public'));



mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


const EventRoute = require("./app/routes/event.routes");
EventRoute(app);
const OrderRoute = require("./app/routes/order_routes")
OrderRoute(app);

const ProductRoute = require("./app/routes/product.routes");
ProductRoute(app);

const UserRoute = require("./app/routes/user.routes");
UserRoute(app);

const AdminRoute = require("./app/routes/admin.routes");
AdminRoute(app);




const GalleryRoute = require("./app/routes/gallery.routes");
GalleryRoute(app);

const EntrepreneurRoute = require("./app/routes/entrepreneur.routes");
EntrepreneurRoute(app);

const SellingPtRoute = require("./app/routes/SellingPts.routes");
SellingPtRoute(app);

const BlogPostRoute = require("./app/routes/blogPost.routes");
BlogPostRoute(app);

const NewsletterRoute = require("./app/routes/newsletter.routes");
NewsletterRoute(app);

const ContactFormRoute = require("./app/routes/contactForm.routes");
ContactFormRoute(app);


app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});

