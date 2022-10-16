const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

main().catch(err => console.log(err));

async function main() {
  const conn = mongoose.connect('mongodb://localhost:27017/conFusion');

  conn.then((db) => {
    console.log('Connected correctly to server');

    var newDish = Dishes({
        name:'Pizza',
        description: 'test 2'
    });

    newDish.save()
        .then((dish) => {
            console.log(dish);
            return Dishes.find({});
        })
        .then((dishes) => {
            console.log(dishes);
            return Dishes.remove({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => console.log(err));   
        })
    .catch((err) => console.log(err));
  
}


