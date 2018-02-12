import React from 'react'
import { Link } from 'react-router-dom'

const Voter = ({ votes, onDownVote, onUpVote }) => {
    return (
        <div>
            <button onClick={onDownVote}>-</button>
            <span>{votes}</span>
            <button onClick={onUpVote}>+</button>
        </div>
    )
}

const ArticleList = ({articles, voteChangeOnArticle}) => (
    <div>
        {articles.map((article, i) => {
            let id = article._id;
            const onDownVote = voteChangeOnArticle.bind(null, article._id, 'down');
            const onUpVote = voteChangeOnArticle.bind(null, article._id, 'up');
            return (
                <div key={i}>
                    <Link to={`/articles/${id}`}>
                    <div>
                        <h1>{article.title}</h1>
                        <p>{article.body}</p>
                    </div>
                    </Link>
                    <Voter
                        votes={article.votes}
                        onDownVote={onDownVote}
                        onUpVote={onUpVote}
                        />
                        <p>Created By:</p>
                       <Link to={`/users/${article.created_by}`}><p>{article.created_by}</p></Link>
                        <p>{article.comments} comments</p>
                        <br />
                        <br />
                </div>
            )
        })}
    </div>
);

export default ArticleList;