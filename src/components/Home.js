import React from 'react';
import ArticleList from './Votes';
import {fetchArticles, voteArticle} from './api'

class Home extends React.Component {
    state = {
        articles: []
    }

    componentDidMount() { 
            fetchArticles()
        .then(res => {
            this.setState({
                articles: res.articles,
            })
        })
        .catch(console.log)
    }


    voteChangeOnArticle = (articleId, vote) => {
        console.log('voteChangeOnArticle')
        return voteArticle(articleId, vote)
            .then(body => {
                const newArticle = body;
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
    }

  render() {
    return (
        <div className="container">        
                    <ArticleList voteChangeOnArticle={this.voteChangeOnArticle} articles={this.state.articles} /> 
                    </div>
    )
}
}

export default Home