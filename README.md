# Quiz App

This is a quiz application that test users knowledge on basics of programming, fundamentals of computer science and software engineering.  
It is a timed test and takes ten (10) minutes to complete.  
If user does not complete the questions or user finishes answering the questions and submits, users test score will be returned with answers to the quiz  

I built this app to try out building a `GraphQL API` with Next.js API. The GraphQL API was built using `apollo-server-micro` and consumed from the frontend using `SWR` and `graphql-request`

## Setting up the development environment

First, fork this repo.  
Clone your forked version.  
Create a mongodb database called `quiz` and add all the questions (check the `db/schemas/` folder for guidiance)
Add your mongoDB url to .env.local file (check .env.example for guidiance)   
Run the following command on the cli in the root directory of the project:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) on your browser to see the result.

### Updatting quiz question

All quiz questions are fetched from a mongoDB database and can be accessed via graphql [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql). This endpoint can be edited in `pages/api/graphql.ts`.

## Live Demo
[Quiz App](https://quiz-app-graphql-api.vercel.app/)

## Author
[Odinaka Joy](http://dinakajoy.com)
