This project was intended to participate in the take home test for Thinkific

### Date submitted
Sunday, 03/22/2020

**Tech stacks**
- Backend: **ExpressJS**
- Database: **MongoDB**
- Frontend: **React (using CRA)**
- State management & Side effects: **Redux & Saga**

### Why?
At first, I considering between Lumen and ExpressJS for backend, but as I want to keep the code base consistent with the frontend part, I decide to give ExpressJS a go. 

In comparision, NodeJS is good at I/O operations (asynchronous & Non-Blocking I/O) so it is a perfect candidate for this exercise.

### Location of deployed application
Frontend: [https://thinkific-hoang-frontend.herokuapp.com](https://thinkific-hoang-frontend.herokuapp.com "Front-End")

Backend: [https://thinkific-hoang-backend.herokuapp.com](https://thinkific-hoang-backend.herokuapp.com "Back-End")
### Time spent
I spent total amount of 7 hours on this exercise and 1 hour to deploy.

### Assumptions made
I assume that the application only need to display a few important data such as temperature, weather forecast.

### Shortcuts/Compromises made
In a real-world application, it would be better to cache the getWeather endpoint (ex: 24h) using Redis or other caching techniques as the data most likely to change everyday. By doing that we can prevent hitting our database for every request.

### Stretch goals attempted
I attempted all the stretch goals as they are straight forward. 

I feel like the authentication could be done better by improve the generate token part, also the frontend is not yet handle refresh token when the access token is expired. 

There are lots of thing that could be done better in frontend part as well (integrate CSS framework, write webpack config, minimize CSS...), at this moment I only use pure css files which is not ideal.

### Instructions to run assignment locally
To run backend
```bash
cd thinkific-backend
cp .env.example .env
cp .env.test.example .env.test
yarn && yarn start
```

To run frontend
```bash
cd thinkific-frontend
yarn && yarn start
```

To run both services with Docker
```bash
docker-compose up
```

Access frontend via [http://localhost:3000](http://localhost:3000 "Front-End")

Access backend via [http://localhost:5000/api/v1](http://localhost:5000/api/v1 "Back-End")

### What did you not include in your solution that you want us to know about?
I would love to add test coverage to the frontend if I have more time because writing tests always important.

I also want to convert the backend to Typescript. It will help the code easier to read and understand.

In addition, create API documentation (ex: Swagger) is mandatory for backend part.
### Your feedback on this technical challenge
The challenge is well-documented with clear instructions. I think this is a good challenge to test applicants multiple aspects such as problem solving, design API and deployment.
