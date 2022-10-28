const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');

// Configure Multer to support uploading files
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can only upload only image files!'));
    }
    else {
        cb(null, true);
    }
};

const upload = multer({storage: storage, fileFilter: imageFileFilter});
const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());


uploadRouter.route('/')
    .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('Get operation not supported on in /imageUpload');
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('Put operation not supported on in /imageUpload');
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('Delete operation not supported on in /imageUpload');
    });


module.exports = uploadRouter;