const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

main().catch(err => console.log(err));

async function main() {
  const conn = mongoose.connect('mongodb://localhost:27017/conFusion');

  conn.then((db) => {
    console.log('Connected correctly to server');

    Dishes.create({
        name:'Pizza 4',
        description: 'test 2'
    })
    .then((dish) => {
        console.log(dish);
        return Dishes.findByIdAndUpdate(dish._id, {$set: {description: 'Updated test'}},
        { new: true}
        );
    })
    .then((dish) => {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: 'Example comment',
            author: 'Marco Parra'
        });
    
        return dish.save();
    })
    .then((dishes)=> {
        console.log(dishes);
        return Dishes.remove({

        });
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => console.log(err));   
    })
.catch((err) => console.log(err));
  
}


