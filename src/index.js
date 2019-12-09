const axios = require('axios').default;
const cron = require('node-cron');

const config = require('./config');
const { saveGames } = require('./data');

const endpoint = 'https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1';

const mapGames = (games) => games.map(game => ({
  appId: game.appid,
  name: game.name,
  totalPlayTime: game.playtime_forever,
}));

cron.schedule(`*/${config.interval} * * * *`, async () => {
  try {
    const { data } = await axios.get(endpoint, {
      params: {
        key: config.steamKey,
        steamid: config.steamId
      }
    });

    const { response: { games } } = data;
    const mappedGames = mapGames(games);
    await saveGames(mappedGames);
  } catch (error) {
    console.error(error);
  }
});

console.log(`Booted and activated cron to run every ${config.interval} mins`);
