import React, {Component} from 'react';
import {fetchOneArticle, fetchComments, postingComment, deletingComment, voteComment} from './api'
import CommentList from './CommentVotes';
import Moment from 'react-moment';
import { Link } from 'react-router-dom'
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import './ClickedArticle.css'


class ClickedArticle extends Component {
state = {
    loading: true,
    article: [],
    articleId: null,
    comments: [],
    current: 1
}

componentDidMount() {
    let articleId = this.props.match.params._id
    Promise.all([
        fetchOneArticle(articleId),
        fetchComments(articleId)
    ])
    .then(([articleRes, commentsRes]) => {
        this.setState({
        comments: commentsRes.comments,
        article: articleRes.article,
        articleId: articleId
    })
    })
}

handleComment = (event) => {
    event.preventDefault()
  let comment = event.target.comment.value;
  postingComment(this.state.articleId, comment)
  .then(res => {
    this.setState({
        comments: [res.newComment, ...this.state.comments]
    })
})
event.target.comment.value = '';
}

deleteComment = (commentId) => {
    deletingComment(commentId)
    .then(res => {
      if (res.status === 202)  return fetchComments(this.state.articleId)
    })
    .then(commentsRes => {
        this.setState({
            comments: commentsRes.comments
        })
    })
}

fetchNextComments = (event) => {
    let currentPage = this.state.current;
    let nextPage = 0;

    if (event.target.value === 'next') nextPage = +currentPage + 1;
    if (event.target.value === 'previous') nextPage = +currentPage - 1;

    if (nextPage < 0) nextPage = 0;
    if (nextPage > 4) nextPage = 4;

    return fetchComments(this.state.articleId, nextPage)
        .then((res) => {
            this.setState({
                comments: res.comments,
                current: nextPage
            })
        })
        .catch(console.log);
}

render() {
    return (
        <div className="pageContainer">
            {this.state.article[0] &&
            <div className="innerContainer">
            <div className="textContainer">
                <h1>{this.state.article[0].title}</h1>
                <br />
                <p>{this.state.article[0].body}</p>
                <hr />
                <br />
                <form onSubmit={this.handleComment}>
                <FormGroup controlId="formControlsTextarea">
      <ControlLabel id="postLabel">Post a Comment:</ControlLabel>
      <FormControl componentClass="textarea" id='comment' placeholder="Your comment..." />
                <br />
                <Button id="postButton" type="submit">Post</Button>
    </FormGroup>
                </form>
                <br />
                <br />
                <br />
                
                {this.state.comments.map((comment, i) => {
                    if (comment.created_by === "northcoder")
                    return (
                        <div>
                        <div key={i} className="commentDiv">
                            <p>{comment.body}</p>
                            <Moment fromNow>{comment.created_at}</Moment>
                       <Link to={`/users/${comment.created_by}`}><p><i class="fas fa-user"></i> Created by: {comment.created_by}</p></Link>
                               <button type="submit" onClick={() => this.deleteComment(comment._id)}>Delete</button>
                        </div>
                        <br />
                        </div>
                    )
                    else 
                    return (
                        <div>
                        <div key={i} className="commentDiv">
                        <p>{comment.body}</p>
                        <Moment fromNow>{comment.created_at}</Moment>
                   <Link to={`/users/${comment.created_by}`}><p><i class="fas fa-user"></i> Created by: {comment.created_by}</p></Link>
                    </div>
                    <br />
                    </div>
                    )
                })}
                </div>
            </div>}
            <div className="buttons">
                 <Button id="left" type="submit" value="previous" onClick={this.fetchNextComments} disabled={this.state.current < 2 ? true : false}><i class="fas fa-arrow-alt-circle-left" /></Button>
                 <Button type="submit" value="next" onClick={this.fetchNextComments} disabled={this.state.comments.length < 5 ? true : false}><i class="fas fa-arrow-alt-circle-right" /></Button>
        </div>
        </div>
    )
}
}

export default ClickedArticle