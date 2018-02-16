import React, {Component} from 'react';
import {fetchUsers} from './api'
import { Link } from 'react-router-dom'

class AllUsers extends Component {
    state = {
        users: []
    }

    componentDidMount() {
        fetchUsers()
        .then(res => {
            console.log(res)
            this.setState({
                users: res.users
            })
        })
    }

    render() {
        return (
<div>
    <a>Users: </a>
    {this.state.users &&
    this.state.users.map((user, i) => {
        return (
            <div key={i}>
                <Link to={`/users/${user.username}`}>{user.username}</Link>
            </div>
        )
    })}
</div>
        )
    }
}

export default AllUsers;