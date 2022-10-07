module.exports = (x, y, callback) => {
    if ( x <=0 || y <=0) {
        // Use to simulated delay time to response.
        setTimeout(() =>  
            callback(new Error("Rectangule dimensions should be greater than zero: l = " + x + ", and b = " + y), null), 2000);      
    }
    else {
        setTimeout(() => callback(null, {
            perimeter: () => (2*(x+y)),
            area: () => (x*y)
        }), 2000);
    }
}

