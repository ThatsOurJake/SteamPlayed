const axios = require('axios').default;
const cron = require('node-cron');

const config = require('./config');
const { saveGames } = require('./data');
const { logger } = require('./logger');

const endpoint = 'https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1';

const mapGames = (games) => games.map(game => ({
  appId: game.appid,
  name: game.name,
  totalPlayTime: game.playtime_forever,
}));

cron.schedule(`*/${config.interval} * * * *`, async () => {
  logger.info('===== Getting steam games =====');

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

    logger.info('===== Finished saving games =====');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error('Failed to fetch games', { req: error.request, res: error.response });
    } else {
      logger.error(error.message, { err: error });
    }
  }
});

logger.info(`Booted and activated cron to run every ${config.interval} mins`);
