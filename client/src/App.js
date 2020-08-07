import React, {Component} from 'react';
import {Router} from "@reach/router";
import Items from "./Items";
import Item from "./Item";

class App extends Component {
    // API url from the file '.env' OR the file '.env.development'.
    // The first file is only used in production.
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);
        this.state = {
            Items: []
        };
    }

    componentDidMount() {
        // Get everything from the API
        this.getItems().then(() => console.log("Auction created"));
    }

    async getItems() {
        let url = `http://localhost:8080/api/items`; // URL of the API.
        let result = await fetch(url); // Get the data
        let items = await result.json(); // Turn it into json
        this.setState({ // Set it in the state
            Items: items
        })
    }

    getItem(id) {
        const item = this.state.Items.find(a => a._id === id);
        return item;
    }

    async placeBid(id, text) {
        console.log("placeBid", id, text);
        const url = `http://localhost:8080/api/items/${id}/bids`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                text: text
            })
        });
        const data = await response.json();
        console.log("Printing the response:", data);

        this.getItems();
    }

    async addItem(text) {
        console.log("addItem", text);
        const url = 'http://localhost:8080/api/items/newauction';
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                text: text
            })
        });
        const data = await response.json();
        console.log("Printing the response:", data);
        this.getItems();
    }

    render() {
        return (
            <>
                <h1>Online Auction House</h1>
                <Router>
                    <Items path="/" data={this.state.Items}
                               addItem={(text) => this.addItem(text)}
                    ></Items>
                    <Item path="/Item/:id"
                              getItem={id => this.getItem(id)}
                              postBid={(id, text) => this.postBid(id, text)}
                    ></Item>
                </Router>
            </>
        );
    }
}

export default App;
