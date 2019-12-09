# SteamPlayed
<p align="center"><img src="https://render.bitstrips.com/v2/cpanel/42ca3b75-f6b4-462e-8579-2db707c76ba2-a751e3ba-001e-4d29-9abd-7999ebde2a91-v1.png?transparent=1&palette=1" /></p>

This will call the the steam api every _by default_ 30 mins and get the most recently played games and save any games into a local database with the date.

## Setup
The following env vars are needed
```
STEAM_KEY
STEAM_ID
```

`STEAM_KEY` can be generate within steam [here](https://steamcommunity.com/dev/apikey)
`STEAM_ID` can be found by searching your username [here](https://steamdb.info/calculator)

*Unsure if the steam profile has to be public*

Setting the `INTERVAL` env var allows the configuration of how often it runs within an hour. For example interval of `30` will run every half and hour whereas an interval of `15` will run every 15 mins.

### Running locally
If you want to run it locally then run the command below
```
STEAM_KEY=replace_me STEAM_ID=replace_me INTERVAL=replace_me npm start
```

## Running inside docker
If you want to run inside docker then simply run the command below and mount a volume from the host to persist the `games.db`
```
docker run -e "STEAM_KEY=replace_me"  -e "STEAM_ID=replace_me" -e "INTERVAL=replace_me" -v <path>:/app/data thatsourjake/steam_played
```

If you want to mount a directory within a folder for an absolute path this snippet can be helpful
```
# Mount /data at the current working directory
-v $PWD/data:/app/data
```

## Processing the Games Db
The games db used [nedb](https://github.com/louischatriot/nedb) this in theory means you can use this package and point it at the existing games db and run queries again it. Haven't tried it yet so I recommend backing it up until I update this readme.
