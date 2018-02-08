import React, {Component} from 'react';
import {fetchUsers} from './api'

class UsersPage extends Component {
    state = {
        user: []
    }

    componentDidMount() {
        let username = this.props.match.params.username
        fetchUsers(username)
        .then(res => {
            this.setState({
                user: res.users
            })
        })
    }

    render() {
        console.log(this.state.user[0])
        return (
            <div>
            {this.state.user[0] &&
            <div>
                <img src={this.state.user[0].avatar_url} alt="Image not found" />
                <p>{this.state.user[0].username}</p>
                <p>{this.state.user[0].name}</p>
            </div>
            }
            </div>
        )
    }
}

export default UsersPage