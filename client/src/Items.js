import React, {Component} from 'react';
import {Link} from "@reach/router";
import PostBid from "./PostBid";
import AddItem from "./AddItem";

class Items extends Component {
    render() {
        const list = this.props.data.map(a =>
            <li><Link to ={"/Item/"+a._id}>{a.title}</Link></li>);

        return (
            <>
            <ul>
                {list}
            </ul>

            <AddItem addItem={title => this.props.addItem(title)}/>
            </>
        );
    }
}

export default Items;