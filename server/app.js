/**** External libraries ****/
const express = require('express'); // The express.js library for implementing the API
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const mongoose = require('mongoose');
const appName = "Express API Template"; // Change the name of your server app!
const port = process.env.PORT || 8080; // Pick port 8080 if the PORT env variable is empty.
const app = express(); // Get the express app object.
const path = require('path');

app.use(bodyParser.json()); // Add middleware that parses JSON from the request body.
app.use(morgan('combined')); // Add middleware that logs all http requests to the console.
app.use(cors()); // Avoid CORS errors. https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use(express.static('../client/build'));

/**** Routes ****/
app.get('/api/items', (req, res) => {
    Item.find({}, (error, items) => {
        res.json(items)})
});

app.post('/api/items/:id/bids', async (req, res) => {
    const id = req.params.id;
    const text = req.body.text;
    let bidWinner = parseInt(text);
    const item = await Item.findById(id)
    if(item.bids[item.bids.length-1].bidAmount > bidWinner){
        res.json({isBidTheHighest: "Please bid higher than the current winning bid!"})
    }
    else{
        item.bids.push({bidAmount: bidWinner, date: Date.now()});
        item.save();
        console.log(item);
        res.json({msg: "Bid posted!", item: item});
    }
});
app.post('/api/items/newitem', (req, res) => {
    const text = req.body.text;
    let item = new Item({title: text, desc: text, bids:[{bidAmount:0, date: Date.now()}]});
    item.save();

    res.json({msg: "Your item has been added", item: item})

});

let Item;
let User;
const itemSchema = new mongoose.Schema({
    title: String,
    desc: String,
    bids: [{
        bidAmount: Number,
        date: Date
    }]
});
const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    fullName: String,
    creationDate: Date
});

Item = mongoose.model('item', itemSchema);
User = mongoose.model('user', userSchema);

app.get('*', (req, res) =>
    res.sendFile(path.resolve('..','client','build','index.html'))
);

const databaseUrl = "mongodb+srv://maria:rehgar123@cluster0.e7roh.mongodb.net/test";
mongoose.connect(databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true}).then(async() => {
        await app.listen(port);
        console.log("Database is now connected to:", mongoose.connection.name)
    }).catch(error => console.error(error));
