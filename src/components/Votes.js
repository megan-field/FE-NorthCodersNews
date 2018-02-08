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

const ArticleList = ({ articles, voteChangeOnArticle }) => (
    <div>
        {articles.map((article, i) => {
            let id = article._id;
            const onDownVote = voteChangeOnArticle.bind(null, article._id, 'down');
            const onUpVote = voteChangeOnArticle.bind(null, article._id, 'up');
            return (
                <div key={i}>
                    <Link to={`articles/${id}`}>
                        <p>{article.title}</p>
                    </Link>
                    <Voter
                        votes={article.votes}
                        onDownVote={onDownVote}
                        onUpVote={onUpVote}
                    />
                </div>
            )
        })}
    </div>
);

export default ArticleList;