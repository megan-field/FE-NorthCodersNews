import React from 'react';
import ArticleList from './ArticleList';
import { fetchArticles, fetchNewArticles, voteArticle } from './api'
import './HomePage.css'
import { Button } from 'react-bootstrap'




class Home extends React.Component {
    state = {
        articles: [],
        current: 1
    }

    componentDidMount() {
        fetchArticles()
            .then(res => {
                this.setState({
                    articles: res.articles,
                    current: res.current
                })
            })
            .catch(console.log)
    }


    voteChangeOnArticle = (articleId, vote) => {
        console.log("Getting here")
        return voteArticle(articleId, vote)
            .then(body => {
                const newArticle = body.article;
                console.log(newArticle)
                const newArticles = this.state.articles.map(article => {
                    if (article._id === newArticle._id) {
                        return newArticle
                    }
                    return article;
                })
                this.setState({
                    articles: newArticles
                })
            })
            .catch(console.log)
    }

    fetchNextPost = (direction) => {
        let currentPage = this.state.current;
        let nextPage = 0;

        if (direction === 'next') nextPage = +currentPage + 1;
        if (direction === 'previous') nextPage = +currentPage - 1;

        if (nextPage < 0) nextPage = 0;
        if (nextPage > 4) nextPage = 4;
        
        return fetchArticles(null, nextPage)
            .then((res) => {
                console.log('fetched new articles');
                
                this.setState({
                    articles: res.articles,
                    current: nextPage
                })
            })
            .catch(console.log);

    }

    render() {
        return (
            <div className="homeContainer">
                <ArticleList articles={this.state.articles} voteChangeOnArticle={this.voteChangeOnArticle} />

                <div className="buttons">
                    <Button id="left" type="submit" onClick={this.fetchNextPost.bind(null, "previous")} disabled={this.state.current < 2 ? true : false}><i className="fas fa-arrow-alt-circle-left" /></Button>
                    <Button id="right" type="submit" onClick={this.fetchNextPost.bind(null, "next")} disabled={this.state.articles.length < 10 ? true : false}><i className="fas fa-arrow-alt-circle-right" /></Button>
                </div>
            </div>
        )
    }
}

export default Home