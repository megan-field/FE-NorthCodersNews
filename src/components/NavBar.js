import React from 'react';
import { fetchTopics } from './api';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './HomePage.css';

class NavBar extends React.Component {
    state = {
      topics: [],
    }

    componentDidMount() {
      fetchTopics()
        .then(res => {
          this.setState({
            topics: res.topics
          });
        })
        .catch(console.log);
    }

    render() {
      return (
        <Navbar className="navbar">
          <Navbar.Header>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="/">
                        NorthCoders
              </NavItem>
              {this.state.topics.map((topic, i) => {
                return (
                  <NavItem eventKey={2} key={i} href={`/topics/${topic.slug}/articles`}>
                    {topic.title}
                  </NavItem>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
}

export default NavBar;