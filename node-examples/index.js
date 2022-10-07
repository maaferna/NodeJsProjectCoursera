var rect = require('./rectangle');


function solverRect(l,b) {
    console.log("Solving for rectangule with = " +  l +"and b = " +b);
    if ( l <=0 || b <=0) {
        console.log("Error: Rectangule dimensions should be greater than zero")
    }
    else {
        console.log("The area of the rectangle is " + rect.area(l,b))
        console.log("The perimer of the rectangle is " + rect.perimeter(l,b))
    }
}

solverRect(3, 4);
solverRect(0, 5);
solverRect(-3, 6);