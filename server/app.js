/**** External libraries ****/
const express = require('express'); // The express.js library for implementing the API
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

/**** Configuration ****/
const appName = "Express API Template"; // Change the name of your server app!
const port = process.env.PORT || 8080; // Pick port 8080 if the PORT env variable is empty.
const app = express(); // Get the express app object.

app.use(bodyParser.json()); // Add middleware that parses JSON from the request body.
app.use(morgan('combined')); // Add middleware that logs all http requests to the console.
app.use(cors()); // Avoid CORS errors. https://en.wikipedia.org/wiki/Cross-origin_resource_sharing

/**** Database Connection ****/
const mongoDB = "mongodb+srv://maria:rehgar123@cluster0.e7roh.mongodb.net/test";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
.then( async() => {await app.listen(port)
console.log('The database is now connected!')} )
.catch(err => console.log(err));

/***Database schema***/
const Schema = mongoose.Schema;

let item;

let itemSchema = new Schema ({
    title: String,
    description: String, 
    item: [{
    date: Date,
    bid: Number
}]
});

let UserSchema = new Schema ({
    user: {
    name: String,
    username: String,
    password: String
    }
});


// This model is used in the methods of this class to access kittens
item = mongoose.model('itemModel', itemSchema);

const userModel = mongoose.model('userModel', UserSchema);



/**** Routes ****/

// Return all recipes in data
app.get('/api/items', (req, res) => {
    item.find({}, (error, items) => {
        res.json(items)})
})

// PostAnswer
app.post('/api/items/:id/bids', (req, res) => {
    const id = parseInt(req.params.id);
    const text = req.body.text;
    const item = items.find(a => a._id === id);
    item.bids.push(text);
    console.log(item);
    res.json({msg: "Bid placed", item: item});
});

app.post('/api/items/newauction', (req, res) => {
    const text = req.body.text;
    let item = new test({title:text, description:text, item:[]});
    item.save();

    res.json({msg: "Auction added", item})

})

