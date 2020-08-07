import React, {Component} from 'react';
import {Link} from "@reach/router";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    Login() {
        console.log("login", this.state.username, this.state.password);
        this.props.login(this.state.username, this.state.password);
    }

    render() {
        return (
            <>
                <form>
                    <input type="text" placeholder="Username" name="username"
                           onChange={event => this.onChange(event)}
                    />

                    <input type="password" placeholder="Password" name="password"
                           onChange={event => this.onChange(event)}
                    />
                </form>

                <button onClick={_ => this.Login()}>Login</button>

                <Link to="/">Back</Link>
            </>
        );
    }
}

export default Login;