const  express = require('express');
const http = require('http');

//declare use of Morgan
const morgan = require('morgan');


// configure router with express 
const bodyParser = require('body-parser');

// Import Router express from dishRouter file
const dishRouter = require('./routes/dishRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev')); //use morgan in the developement stage
app.use(express.json());


// declare routes
app.use('/dishes', dishRouter);

app.use(express.static(__dirname + '/public'));

app.get('/dishes/:dishId', (req, res, next) => {
    res.end('Will send details of the dish: ' + req.params.dishId+
    'to you!');
});

app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation not supported on in dishes/: ' +
    req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
    res.write('Will update the dish: ' + req.params.dishId +
        '\n');
    res.end('Will update the dish: ' + req.body.name 
    + ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});

app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});





