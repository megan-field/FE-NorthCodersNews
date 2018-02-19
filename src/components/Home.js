import React from 'react';
import ArticleList from './Votes';
import {fetchArticles, fetchNewArticles, voteArticle} from './api'
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

    fetchNextPost = (event) => {
        let currentPage = this.state.current;
        let nextPage = 0;

        if (event.target.value === 'next') nextPage = +currentPage + 1;
        if (event.target.value === 'previous') nextPage = +currentPage - 1;

        if (nextPage < 0) nextPage = 0;
        if (nextPage > 4) nextPage = 4;

        return fetchArticles(null, nextPage)
            .then((res) => {
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
                 <Button id="left" type="submit" value="previous" onClick={this.fetchNextPost} disabled={this.state.current < 2 ? true : false}><i class="fas fa-arrow-alt-circle-left"></i></Button>
                 <Button type="submit" value="next" onClick={this.fetchNextPost} disabled={this.state.articles.length < 10 ? true : false}><i class="fas fa-arrow-alt-circle-right"></i></Button>
        </div>
                    </div>
    )
}
}

export default Home