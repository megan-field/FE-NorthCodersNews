import React, { Component } from 'react'
import { postingComment } from './api'

class PostComment extends Component {
    state = {
        comment: '',
        articleId: null
    }

componentDidMount() {
    const {articleId} = this.props
    this.setState({
        articleId: articleId
    })

}

    handleComment = (event) => {
        event.preventDefault()
      let comment = event.target.comment.value;
      postingComment(this.props.articleId, comment)
      .then(res => {
        this.setState({
            comment: res
        })
      })

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleComment}>
                <label>Post a Comment:</label>
                <input type="text" id='comment' />
                <input type="submit" value="Post" />
                </form>
            </div>
        )
    }
}

export default PostComment;