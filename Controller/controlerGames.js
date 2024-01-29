const { Game } = require('../models/models.js'); // Import your Game model

// Get all games
exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific game by ID
exports.getGameById = async (req, res) => {
  const gameId = req.params.id;

  try {
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new game
exports.createGame = async (req, res) => {
  const { name, thumbnail, genre, platform } = req.body;
  const game = new Game({ name, thumbnail, genre, platform });

  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a game by ID
exports.updateGame = async (req, res) => {
  const gameId = req.params.id;
  const updates = req.body;

  try {
    const updatedGame = await Game.findByIdAndUpdate(gameId, updates, { new: true });
    if (!updatedGame) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(updatedGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a game by ID
exports.deleteGame = async (req, res) => {
  const gameId = req.params.id;

  try {
    const deletedGame = await Game.findByIdAndDelete(gameId);
    if (!deletedGame) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json({ message: 'Game deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a game by Name
exports.deleteGame = async (req, res) => {
  const gameName = req.params.name;

  try {
    const deletedGame = await Game.findByNameAndDelete(gameId);
    if (!deletedGame) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json({ message: 'Game deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific game by name
exports.getGameByName = async (req, res) => {
  const gameName = req.params.name; // Assuming you define the route as '/games/:name'

  try {
    const game = await Game.findOne({ name: gameName });
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get games by genre
exports.getGamesByGenre = async (req, res) => {
  const genre = req.params.genre; // Assuming you define the route as '/games/genre/:genre'

  try {
    const games = await Game.find({ genre: genre });
    if (!games || games.length === 0) {
      return res.status(404).json({ message: 'No games found for the specified genre' });
    }
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};