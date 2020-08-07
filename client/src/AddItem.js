import React,{Component} from 'react';

class AddItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: ""
        };


    }
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit() {
        this.props.addItem(this.state.items);
    }
    render() {
        return (
            <>
                <input name="items" onChange={event => this.onChange(event)} type="text"/>
                <button onClick={_ => this.onSubmit()}>Add item for auction</button>
            </>
        );
    }
}

export default AddItem;