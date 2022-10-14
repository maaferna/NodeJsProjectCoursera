const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(express.json());

promoRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res, next) => {
    res.end('Will send all the promotions to you!');
})

.post((req, res, next) => {
    res.end('Will add the promotions: ' +  req.body.name 
            + 'with details: ' + req.body.description);
})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation not supported on in promoes');
})

.delete((req, res, next) => {
    res.end('Deleting all the promoes');
});


promoRouter.route('/:promoId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res, next) => {
    res.end('Will send details of the promotion: ' + req.params.promoId+
    'to you!');
})

.post((req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation not supported on in promotion/: ' +
    req.params.promoId)
})
.put((req, res, next) => {
    res.write('Will update the promotion: ' + req.params.promoId +
        '\n');
    res.end('Will update the promotion: ' + req.body.name 
    + ' with details: ' + req.body.description);
})

.delete((req, res, next) => {
    res.end('Deleting promotion: ' + req.params.promoId);
});


module.exports = promoRouter;