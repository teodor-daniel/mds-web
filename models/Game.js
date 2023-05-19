const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  game_name: {
    type: String,
    required: true,
  },
  game_poster_path: {
    type: String,
    required: true,
  },
  game_summary: {
    type: String,
    required: true,
  },
  game_release_date: {
    type: Date,
    required: true,
  },
  game_developer: {
    type: String,
    required: true,
  },
  game_publisher: {
    type: String,
    required: true,
  },
  game_tags: [{
    type: String,
    required: true,
  }]
});

const Game = mongoose.model("Game", GameSchema);
module.exports = Game;
