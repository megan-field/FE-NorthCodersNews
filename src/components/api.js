export const fetchTopics = () => {
    return  fetch('https://northcoders-news-api.herokuapp.com/api/topics').then(res => res.json())
}

export const fetchArticles = (topic) => {
    return topic ? fetch(`https://northcoders-news-api.herokuapp.com/api/topics/${topic}/articles`).then(res => res.json()) : fetch('https://northcoders-news-api.herokuapp.com/api/articles').then(res => res.json());
 }

 export const voteArticle = (articleId, vote) => {
    return fetch(`https://northcoders-news-api.herokuapp.com/api//articles/${articleId}?vote=${vote}`, {
        method: 'PUT'
    }).then(res => res.json());
}

export const fetchComments = (articleId) => {
    return  fetch(`https://northcoders-news-api.herokuapp.com/api/articles/${articleId}/comments`).then(res => res.json())
}

export const postingComment = (articleId, comment ) => {
    const data = {"comment": comment}
    console.log(articleId)
    return fetch(`https://northcoders-news-api.herokuapp.com/api/articles/${articleId}/comments`, {
        method: 'POST',
        // mode: 'cors',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}

export const fetchUsers = (username) => {
    return username ? fetch(`https://northcoders-news-api.herokuapp.com/api/users/${username}`).then(res => res.json()) : fetch('https://northcoders-news-api.herokuapp.com/api/users').then(res => res.json())
}