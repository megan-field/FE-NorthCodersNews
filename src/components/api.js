export const fetchTopics = () => {
    return  fetch('https://northcoders-news-api.herokuapp.com/api/topics').then(res => res.json())
}

export const fetchArticles = (topic) => {
    return topic ? fetch(`https://northcoders-news-api.herokuapp.com/api/topics/${topic}/articles`).then(res => res.json()) : fetch('https://northcoders-news-api.herokuapp.com/api/articles').then(res => res.json());
 }