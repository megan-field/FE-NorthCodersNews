import React from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css';
import { Button } from 'react-bootstrap'

class ArticleList extends React.Component {
    state = {
        UPdisable: false,
        DOWNdisable: false
    }

    handleUpChange = (onUpVote) => {
        onUpVote()
        this.setState({ UPdisable: true })
    }
   
    handleDownChange = (onDownVote) => {
        onDownVote()
        this.setState({ DOWNdisable: true })

    }

    render() {
        return (
            <div className="articlelist">
                {this.props.articles &&
                    this.props.articles.map((article, i) => {
                        let id = article._id;
                        let icon;
                        if (article.belongs_to === "coding") icon = <i class="fas fa-file-code"></i>
                        if (article.belongs_to === "cooking") icon = <i class="fas fa-utensils"></i>
                        if (article.belongs_to === "football") icon = <i class="fas fa-futbol"></i>
                        const onDownVote = this.props.voteChangeOnArticle.bind(null, article._id, 'down');
                        const onUpVote = this.props.voteChangeOnArticle.bind(null, article._id, 'up');                        
                        return (
                            <div key={i}>
                                <div key={i} className="articleDiv">
                                    <Link to={`/articles/${id}`}>
                                        <div className="clickedArticle">
                                            <i>{icon}</i>
                                            <h1>{article.title}</h1>
                                            <p>{article.body}</p>
                                        </div>
                                    </Link>
                                    <div>
                                        <Button onClick={() => this.handleUpChange(onUpVote)} disabled={this.state.UPdisable}><i class="fas fa-thumbs-up"></i></Button>
                                        <span className="voteCount">{article.votes} votes</span>
                                        <Button onClick={() => this.handleDownChange(onDownVote)} disabled={this.state.DOWNdisable}><i class="fas fa-thumbs-down"></i></Button>
                                    </div>
                                    <br />
                                    <Link to={`/users/${article.created_by}`}><p><i class="fas fa-user"></i> Created by: {article.created_by}</p></Link>
                                    <br />
                                </div>
                                <br />
                                <br />
                            </div>
                        )
                    })}

            </div>
        )
    }
};

export default ArticleList;