const path = require('path');
const hash = require('object-hash');
const { DateTime } = require('luxon');

const DataStore = require('nedb');

const gamesStore = new DataStore({
  autoload: true,
  filename: path.resolve('data', 'games.db'),
});

const saveGames = async (games) => {
  for (let i = 0; i < games.length; i++) {
    const { appId, totalPlayTime, name } = games[i];
    const objHash = hash({ id: appId, tpt: totalPlayTime });

    const exists = await new Promise((resolve, reject) => {
      gamesStore.findOne({ _id: objHash }, (error, doc) => error ? reject(error) : resolve(doc));
    });

    if (!exists) {
      await new Promise((resolve, reject) => {
        gamesStore.insert({
          name,
          appId,
          totalPlayTime,
          _id: objHash,
          playedOn: DateTime.local().toFormat('D')
        }, error => error ? reject(error) : resolve());
      });

      console.log(`Saved: ${name}`);
    } else {
      console.log(`Not Saved: ${name} - No updates`);
    }
  }
};

module.exports = { saveGames };
