import React, {Component} from 'react';
import {Link} from "@reach/router";
import PostBid from "./PostBid";
import moment from "moment"

class Item extends Component {
    render() {
        const id = this.props.id;
        const itemContent = this.props.getItem(id);
        let innerContent = <p>Loading</p>;
        let meh = []
        if (itemContent) {
            
            for(let i = 0; i < itemContent.item.length; i++ ){
            meh.push(<li>{itemContent.item[i].userName} {itemContent.item[i].bid}
            {moment(itemContent.item[i].date).format('d MMMM, YYYY')}</li>)
            }
            
            innerContent =
                <>
                    <h1>{itemContent.title}</h1>
                    <section>{itemContent.description}</section>

                    <h3>Bids</h3>
                    <ul>
                        {meh}
                    </ul>

                    <Link to="/">Back</Link>
                </>
        }
        return (
            <>
                <p>{innerContent}</p>
                <h3>Place a bid</h3>

                <PostBid id={id} postBid={(id, title) => this.props.postBid(id, title)}/>
            </>
        );

    }
}

export default Item;
