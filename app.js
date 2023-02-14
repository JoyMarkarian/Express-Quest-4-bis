require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.APP_PORT ?? 2000;

const validateUser = require("./user")
const validateMovie = require("./movie")
const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");

app.use(express.json());


const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);

app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.post("/api/users", validateUser, userHandlers.postUser);

app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
app.put("/api/users/:id", validateUser, userHandlers.updateUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});


