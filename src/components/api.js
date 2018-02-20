const URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'

export const fetchTopics = () => {
    return  fetch(`${URL}/topics`).then(res => res.json())
}

export const fetchArticles = (topic, page) => {
    if (!page) page = 1 
    return (topic) ? fetch(`${URL}/topics/${topic}/articles?page=${page}`).then(res => res.json()) : fetch(`${URL}/articles?page=${page}`).then(res => res.json());
 }

export const fetchOneArticle = (articleId) => {
    return fetch(`${URL}/articles/${articleId}`).then(res => res.json());
 }

 export const voteArticle = (articleId, vote) => {
    return fetch(`${URL}/articles/${articleId}?vote=${vote}`, {
        method: 'PUT'
    }).then(res => res.json());
}

 export const voteComment = (commentId, vote) => {
    return fetch(`${URL}/comments/${commentId}?vote=${vote}`, {
        method: 'PUT'
    }).then(res => res.json());
}

export const fetchComments = (articleId, page) => {
    if (!page) page = 1
    return  fetch(`${URL}/articles/${articleId}/comments?page=${page}`).then(res => res.json())
}

export const postingComment = (articleId, comment ) => {
    const data = {"body": comment}
    return fetch(`${URL}/articles/${articleId}/comments`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
}

export const deletingComment = (commentId) => {
    return fetch(`${URL}/comments/${commentId}`, {
        method: 'DELETE',
    })
}

export const fetchUsers = (username) => {
    return username ? fetch(`${URL}/users/${username}`).then(res => res.json()) : fetch(`${URL}/users`).then(res => res.json())
}