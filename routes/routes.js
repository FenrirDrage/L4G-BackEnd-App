const express = require("express");
const router = express.Router();
const { Game, User, Event } = require("../models/models"); // Import your models
const EventController = require("../Controller/controlerEvent"); // Import controller
const UserController = require("../Controller/controlerUser"); // Import controller
const GameController = require("../Controller/controlerGames"); //Import controller
const { validationResult, body } = require("express-validator");

//route to login
router.post("/login", function (req, res) {
  UserController.login(req, res);
});

//route to register
router.post(
  "/register",
  [
    body("name").notEmpty().escape(),
    body("email").notEmpty().escape(),
    body("password").notEmpty().escape(),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      UserController.register(req, res);
    } else {
      res.status(404).json({ errors: errors.array() });
    }
  }
);

// Route to add a new game
router.post("/games", async (req, res) => {
  const { name, thumbnail, genre, platform } = req.body;
  const game = new Game({ name, thumbnail, genre, platform });

  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to add a new user
router.post("/users", async (req, res) => {
  const { name, email, age, discordAccount, bio, tagname } = req.body;
  const user = new User({ name, email, age, discordAccount, bio, tagname });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Routes for users
router.get("/users/authenticated", UserController.getUserAuthenticated);
router.get("/users", UserController.getAllUsers);
router.get("/users", UserController.getUserById);
router.post("/users", UserController.createUser);
router.put("/users", UserController.updateUser);
router.delete("/users", UserController.deleteUser);
// Rota para pesquisar eventos nos quais o usuário está inscrito
//router.get("/users/:id/events", UserController.getEventsForUser);

// Routes for events
router.get("/events", EventController.getAllEvents);
router.get("/events/:name", EventController.getEventByName);
router.get("/events/id/:id", EventController.getEventById); // Adjusted path
router.get("/events/game/:nameGame", EventController.getEventByNameGame);
router.post("/events", EventController.createEvent);
router.put("/events/:id", EventController.updateEvent);
router.delete("/events/id/:id", EventController.deleteEvent); // Adjusted path
router.delete("/events/name/:name", EventController.deleteEventByName); // Adjusted path

// Routes for games
// Routes for games
router.get("/games", GameController.getAllGames);
router.get("/games/:id", GameController.getGameById);
router.get("/games/name/:name", GameController.getGameByName); // Updated path
router.get("/games/genre/:genre", GameController.getGamesByGenre); // Updated path
router.post("/games", GameController.createGame);
router.put("/games/:id", GameController.updateGame);
router.delete("/games/:id", GameController.deleteGame);

module.exports = router;
