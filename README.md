Northcoders News
Northcoders News is a social news aggregation, web content rating, and discussion website. It is similar to Reddit

Northcoders News has articles which are divided into topics. Each article has user curated ratings and can be up or down voted using the API. Users can also add comments about an article. Comments can also be up or down voted. A user can add comments and remove any comments which they have added.

Objectives
Pull together all the skills and technologies you have learnt over the past three weeks.
Learn about working with a C.R.U.D application from a front end perspective.
Make more advanced asynchronous API calls.
Begin to familiarise yourself with the various HTTP response codes and update your UI accordingly.
Learn more common HTTP request types POST, PUT & DELETE
Learn more about interacting with a server using URL queries and request bodies.
You will be getting the data from your implementation of the Northcoders News API server.

Stages
Have a look at your API endpoints and at Reddit. Think about what data you have available, and how you will structure your application. What routes will your application have? What articles will you choose to display on the main page?

Set up your routing with React Router. Render dummy components and make sure they are rendering in the right place (with hard-coded data).

Think about what data each component will need. Where will it come from? Will any components need to pass data down to dumb components as props? Focus on loading a list of articles for your front page first of all.

Consider more complex functionality. You should be able to post a new comment on a topic. NB all comments you post from your app will automatically have the username 'northcoder'. Consider whether the comments will appear in order of popularity or by time.

You should also be able to delete comments that you have posted. If you try to delete a comment that does not have the author 'northcoder' the API throws an error.

Each comment, and each article, can be upvoted or downvoted. See the API reference which explains how to to this.

Users
Users are available from the API and have already been busy adding comments to the articles! There is also a 'northcoder' user. Any comments you add will belong to the 'northcoder' user and you will also be able to delete those comments using the API.

Extra credit
Create a route which shows which users have been most active adding articles and comments
Make this route sort the users by how popular they are based on an aggregation of their article and comment vote counts
Implement a filter which re-orders comments based on either the time they were added, or how many votes they have got.
Important
This sprint is among the ones we'll ask you to complete in order to put you forward for jobs. Put a little bit of love into it! :)

You may use your own API or the one provided above. Start with yours and if you run into problems you can switch to ours (you should only have to change the URL). There's no point in spending a lot of time fixing your server, focus on the front-end.