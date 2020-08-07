import React, {Component} from 'react';
import {Link} from "@reach/router";
import PostBid from "./PostBid";
import Moment from "moment"

class Item extends Component {
    render() {
        const id = this.props.id;
        const content = this.props.getItem(id);
        let subContent = <p>Loading...</p>;
        let list = [];
        if (content) {
            for(let i = 0;i < content.bids.length; i++){
            list.push(<li>{content.bids[i].bidAmount} kr. - {Moment(content.bids[i].date).format('MM Do YY, h:mm:ss')}</li>)
            }
            subContent =
                <>
                    <h1>
                        {content.title}
                    </h1>
                    <p>
                        {content.desc}
                    </p>

                    <h3>Item bids</h3>
                    <ul>
                        {list}
                    </ul>

                    <Link to="/">Back</Link>
                </>
        }
        return (
            <>
                <p>{subContent}</p>
                <h3>Post bid on this item</h3>

                <PostBid id={id} postBid={(id, title) => this.props.postBid(id, title)}/>
            </>
        );

    }
}

export default Item;
