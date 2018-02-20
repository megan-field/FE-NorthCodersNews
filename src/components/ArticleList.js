import React from 'react'
import { Link } from 'react-router-dom'
import Voter from './Voter.js'
import './HomePage.css';
import { Button } from 'react-bootstrap'


const ArticleList = ({articles, voteChangeOnArticle}) => {

        return (
            <div className="articlelist">
                    {articles.map((article, i) => {
                        let id = article._id;
                        let icon;
                        if (article.belongs_to === "coding") icon = "https://cdn1.iconfinder.com/data/icons/seo-icons-5/96/Coding-512.png"
                        if (article.belongs_to === "cooking") icon = "https://cdn0.iconfinder.com/data/icons/food-drinks-1-1/128/eating-128.png"
                        if (article.belongs_to === "football") icon = "http://simpleicon.com/wp-content/uploads/football.png"
                        return (
                            <div key={i}>
                                <div key={i} className="articleDiv">
                                    <Link to={`/articles/${id}`}>
                                        <div className="clickedArticle">
                                            <img src={icon} alt="</>" style={{height:30}} />
                                            <h1 className="articleTitle">{article.title}</h1>
                                            <p className="articleBody">{article.body}</p>
                                        </div>
                                    </Link>
                                    <Voter
                                        votes={article.votes}
                                        articleId={article._id}
                                        voteChangeOnArticle={voteChangeOnArticle}
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
        )
};

export default ArticleList;