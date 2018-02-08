import React from 'react';
import {Link} from 'react-router-dom';
import {fetchTopics} from './api'

class NavBar extends React.Component {
    state = {
        topics: [],
    }

    componentDidMount() {   
        fetchTopics()
            .then(res => {
                this.setState({
                    topics: res.topics
                })
            })
            .catch(console.log);
    }

    render() {
    return (
        <div className='links'>
        <Link  to="/">Home</Link>
        { this.state.topics.map((topic, i) => {  
           return (
               <Link to={`/topics/${topic.slug}/articles`} key={i}>{topic.title}</Link>
           )
       })}
        </div>
    )}
}

export default NavBar;