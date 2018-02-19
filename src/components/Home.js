import React from 'react';
import ArticleList from './Votes';
import {fetchArticles, voteArticle} from './api'
import './HomePage.css'


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
        return voteArticle(articleId, vote)
            .then(body => {
                const newArticle = body.article;
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
          <div className="homeContainer">        
         <ArticleList articles={this.state.articles} voteChangeOnArticle={this.voteChangeOnArticle} /> 
                    </div>
    )
}
}

export default Home