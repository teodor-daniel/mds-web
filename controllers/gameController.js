// Models
const GameModel = require("../models/Game");

const RAWG_API_KEY = '7c3304c23b1c45f0811ed3b73d0ede07';

// Controllers
const newGame = async (gameName) => {
    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));    

    let response = await fetch(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${gameName}&page_size=1`);
    let data = await response.json();

    let genres = data.results[0].genres;

    const genresName = [];
    for (let genre of genres)
        genresName.push(genre.name);
        

    response = await fetch(`https://api.rawg.io/api/games/${data.results[0].slug}?key=${RAWG_API_KEY}`);
    data = await response.json();

    let game = new GameModel({
        game_name: data.name,
        game_poster_path: data.background_image,
        game_summary: data.description_raw,
        game_release_date: data.released,
        game_developer: data.developers[0].name,
        game_publisher: data.publishers[0].name,
        game_tags: genresName,
    });

    await game.save();

    return game.id;
}

const getGameByName = async (gameName) => {
    const game = await GameModel.findOne({ game_name: gameName });

    return game;
}

module.exports =  {
    newGame,
    getGameByName,
};