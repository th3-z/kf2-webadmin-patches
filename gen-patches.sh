#! /bin/bash

SEED_COMMIT=14cfe14c5f56304701eadfe7a0319c47cf60d3aa

rm -rf ./patches
mkdir -p ./patches/Web/ServerAdmin
mkdir -p ./patches/Web/images

git diff --relative $SEED_COMMIT:Web/ServerAdmin/gamesummary.inc -- Web/ServerAdmin/gamesummary.inc > patches/Web/ServerAdmin/gamesummary.inc.patch
git diff --relative $SEED_COMMIT:Web/ServerAdmin/current_rules.inc -- Web/ServerAdmin/current_rules.inc > patches/Web/ServerAdmin/current_rules.inc.patch
git diff --relative $SEED_COMMIT:Web/ServerAdmin/header_base.inc -- Web/ServerAdmin/header_base.inc > patches/Web/ServerAdmin/header_base.inc.patch
git diff --relative $SEED_COMMIT:Web/ServerAdmin/current_players_row.inc -- Web/ServerAdmin/current_players_row.inc > patches/Web/ServerAdmin/current_players_row.inc.patch
git diff --relative $SEED_COMMIT:Web/ServerAdmin/current_players.html -- Web/ServerAdmin/current_players.html > patches/Web/ServerAdmin/current_players.html.patch
git diff --relative $SEED_COMMIT:Web/ServerAdmin/current_player_row.inc -- Web/ServerAdmin/current_player_row.inc > patches/Web/ServerAdmin/current_player_row.inc.patch
git diff --relative $SEED_COMMIT:Web/ServerAdmin/current.html -- Web/ServerAdmin/current.html > patches/Web/ServerAdmin/current.html.patch
