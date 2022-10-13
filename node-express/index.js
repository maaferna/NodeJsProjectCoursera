const  express = require('express');
const http = require('http');

//declare use of Morgan
const morgan = require('morgan');


// configure router with express 
const bodyParser = require('body-parser');

// Import Router express from dishRouter file
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev')); //use morgan in the developement stage
app.use(express.json());


// declare routes
app.use('/dishes', dishRouter);
app.use('/dishes/:dishId', dishRouter);
app.use('/promotions', promoRouter);
app.use('/promotions/:promoId', promoRouter);
app.use('/leaders', leaderRouter);
app.use('/leaders/:leaderId', leaderRouter);

app.use(express.static(__dirname + '/public'));


const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});





