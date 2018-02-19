import React from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css';
import { Button } from 'react-bootstrap'

const Voter = ({ votes, onDownVote, onUpVote }) => {
    return (
        <div>
            <Button onClick={onDownVote}><i class="fas fa-thumbs-down"></i></Button>
            <span className="voteCount">{votes} votes</span>
            <Button onClick={onUpVote}><i class="fas fa-thumbs-up"></i></Button>
        </div>
    )
}

const ArticleList = ({articles, voteChangeOnArticle}) => (
    <div className="articlelist">
        {articles.map((article, i) => {
            let id = article._id; 
            const onDownVote = voteChangeOnArticle.bind(null, article._id, 'down');
            const onUpVote = voteChangeOnArticle.bind(null, article._id, 'up');
            return (
                <div key={i}>
                <div key={i} className="articleDiv">
                    <Link to={`/articles/${id}`}>
                    <div className="clickedArticle">
                        <h1>{article.title}</h1>
                        <p>{article.body}</p>
                    </div>
                    </Link>
                    <Voter
                        votes={article.votes}
                        onDownVote={onDownVote}
                        onUpVote={onUpVote}
                        />               
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
);

export default ArticleList;