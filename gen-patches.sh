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
git diff --relative $SEED_COMMIT:Web/ServerAdmin/header.inc -- Web/ServerAdmin/header.inc > patches/Web/ServerAdmin/header.inc.patch
git diff --relative $SEED_COMMIT:Web/ServerAdmin/gamesummary.js -- Web/ServerAdmin/gamesummary.js > patches/Web/ServerAdmin/gamesummary.js.patch
git diff --relative $SEED_COMMIT:Web/ServerAdmin/current_change.html -- Web/ServerAdmin/current_change.html > patches/Web/ServerAdmin/current_change.html.patch
git diff --relative $SEED_COMMIT:Web/ServerAdmin/current_chat.html -- Web/ServerAdmin/current_chat.html > patches/Web/ServerAdmin/current_chat.html.patch
git diff --relative $SEED_COMMIT:Web/ServerAdmin/current_chat_frame.html -- Web/ServerAdmin/current_chat_frame.html > patches/Web/ServerAdmin/current_chat_frame.html.patch
git diff --relative $SEED_COMMIT:Web/ServerAdmin/current_chat_frame.inc -- Web/ServerAdmin/current_chat_frame.inc > patches/Web/ServerAdmin/current_chat_frame.inc.patch
git diff --relative $SEED_COMMIT:Web/ServerAdmin/default_maplist_editor.inc -- Web/ServerAdmin/default_maplist_editor.inc > patches/Web/ServerAdmin/default_maplist_editor.inc.patch
git diff --relative $SEED_COMMIT:Web/ServerAdmin/gamesummary_base.inc -- Web/ServerAdmin/gamesummary_base.inc > patches/Web/ServerAdmin/gamesummary_base.inc
git diff --relative $SEED_COMMIT:Web/ServerAdmin/login.html -- Web/ServerAdmin/login.html > patches/Web/ServerAdmin/login.html.patch
git diff --relative $SEED_COMMIT:Web/ServerAdmin/current_rules_kfgameinfo_survival.inc -- Web/ServerAdmin/current_rules_kfgameinfo_survival.inc > patches/Web/ServerAdmin/current_rules_kfgameinfo_survival.inc.patch
git diff --relative $SEED_COMMIT:Web/images/kf2.css -- Web/images/kf2.css > patches/Web/images/kf2.css.patch
git diff --relative $SEED_COMMIT:Web/images/gamesummary.js -- Web/images/gamesummary.js > patches/Web/images/gamesummary.js.patch
