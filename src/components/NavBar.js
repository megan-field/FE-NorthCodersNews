import React from 'react';
import {NavLink} from 'react-router-dom';

class NavBar extends React.Component {
    state = {topics: []}

    componentDidMount() {
        this.fetchTopics();
    }

    fetchTopics = () => {
        return fetch('')
        .then(resBuffer => resBuffer.json())
        .then(res => {
            console.log(res)
        })
        .catch(console.log);
    }

    render() {
    return (
        <div className='links'>
        <Link  to="/">Home</Link>
        { this.state.topics.map((topic, i) => {
           
           return (
               <Link to={`/topics/${topic}`} key={i}>{topic}</Link>
           )
       })}
        </div>
    )}
}

export default NavBar;