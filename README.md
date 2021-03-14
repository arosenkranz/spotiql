# SpotiQL

A GraphQL wrapper for the Spotify Web API built with NodeJS, Express, Apollo Server, and React

> **Note:** This is a work in progress with many future updates planned including better documentation, TypeScript support, and general cleanup. I like to use this project to help learn new tools and patterns and I can make a mess along the way.

## Instructions for Use

1. Navigate to [spotiql.herokuapp.com](https://spotiql.herokuapp.com) and log in with Spotify.

2. Once you log in, copy your access token from the page and navigate to [spotiql.herokuapp.com/graphql](https://spotiql.herokuapp.com/graphql)

3. Set up HTTP Headers in the lower left corner with the following information:

  ```json
  {
    "authorization": "Bearer <paste-access-token-here>"
  }
  ```

4. Use the Docs tab to see what requests are available and what query variables may be needed. 

For example, the following search query:

  ```graphql
  query searchAll($q: String!) {
    search(q:$q) {
      tracks {
        name
        uri
        id
        artists {
          name
        }
      }
    }
  }
  ```

Will need the following query variables:

  ```json
  {
    "q": "Bob Moses"
  }
  ```


---
Created by [Alex Rosenkranz](https://alexrosenkranz.dev)
