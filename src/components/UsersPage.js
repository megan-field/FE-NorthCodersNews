import React, {Component} from 'react';
import {fetchUsers} from './api'
import './UserPage.css'
import {Image} from 'react-bootstrap'

class UsersPage extends Component {
    state = {
        user: []
    }

    componentDidMount() {
        let username = this.props.match.params.username
        fetchUsers(username)
        .then(res => {
            this.setState({
                user: res.user
            })
        })
    }

    render() {
        return (
            <div className="userPage">
            {this.state.user[0] &&
            <div className="userContainer">
                <h1>{this.state.user[0].name}</h1>
                <h3>{this.state.user[0].username}</h3>
                <br />
                <br />
                <Image id="img" src={this.state.user[0].avatar_url} rounded alt="Broken" />
            </div>
            }
            </div>
        )
    }
}

export default UsersPage