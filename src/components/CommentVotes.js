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

const CommentList = ({comments, voteChangeOnComment}) => (
    <div>
        {comments.map((comment, i) => {
            const onDownVote = voteChangeOnComment.bind(null, comment._id, 'down');
            const onUpVote = voteChangeOnComment.bind(null, comment._id, 'up');
            return (
                <div key={i}>
                    <Voter
                        votes={comment.votes}
                        onDownVote={onDownVote}
                        onUpVote={onUpVote}
                        />               
                        <p>Created By:</p>
                       <Link to={`/users/${comment.created_by}`}><p>{comment.created_by}</p></Link>
                        <br />
                        <br />
                </div>
            )
        })}
    </div>
);

export default CommentList;