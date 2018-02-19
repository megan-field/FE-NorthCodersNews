import React from 'react';
import { Link } from 'react-router-dom';
import { fetchTopics } from './api'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

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
            <Navbar>
                {/* <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#home">NorthCoders</a>
                    </Navbar.Brand>
                </Navbar.Header> */}
                <Nav>
                    <NavItem eventKey={1} href="#">
                        <Link to="/">NorthCoders</Link>
                    </NavItem>
                    {this.state.topics.map((topic, i) => {
                        return (
                            <NavItem eventKey={2} href="#">
                                <Link to={`/topics/${topic.slug}/articles`} key={i}>{topic.title}</Link>
                            </NavItem>
                        )
                    })}
                </Nav>
            </Navbar>
        )
    }
}

export default NavBar;