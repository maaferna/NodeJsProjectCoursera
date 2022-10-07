const rectangle = require('./rectangle');
var rect = require('./rectangle');


function solverRect(l,b) {
    console.log("Solving for rectangule with = " +  l +"and b = " +b);
    rect(l, b, (err, rectangle) => {
        if (err) {
            console.log("ERROR: ", err.message);
        }
        else {
            console.log("The area of the rectangle of dimensions l = " + l
            + ", and b = " + b + " is: " + rectangle.area());
            console.log("The perimeter of the rectangle of dimensions l = " + l
            + ", and b = " + b + " is: " + rectangle.perimeter());
        }
    });
    console.log("This statment is after the call to rectangle function");
};

solverRect(3, 4);
solverRect(0, 5);
solverRect(-3, 6);