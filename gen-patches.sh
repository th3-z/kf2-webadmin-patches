#! /bin/bash

SEED_COMMIT=14cfe14c5f56304701eadfe7a0319c47cf60d3aa

mkdir -p patches

cd ServerAdmin
git diff --relative $SEED_COMMIT:./gamesummary.inc gamesummary.inc > ../patches/gamesummary.inc.patch
git diff --relative $SEED_COMMIT:./current_rules.inc current_rules.inc > ../patches/current_rules.inc.patch
git diff --relative $SEED_COMMIT:./header_base.inc header_base.inc > ../patches/header_base.inc.patch
git diff --relative $SEED_COMMIT:./current_players_row.inc current_players_row.inc > ../patches/current_players_row.inc.patch
git diff --relative $SEED_COMMIT:./current_players.html current_players.html > ../patches/current_players.html.patch
git diff --relative $SEED_COMMIT:./current_player_row.inc current_player_row.inc > ../patches/current_player_row.inc.patch
git diff --relative $SEED_COMMIT:./current.html current.html > ../patches/current.html.patch
cd ..
