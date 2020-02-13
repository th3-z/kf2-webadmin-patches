#! /bin/bash

mkdir -p patches

cd ServerAdmin
git diff --relative c96430ca8e5e57698a82738d0156fbfa2fc70843:./gamesummary.inc gamesummary.inc > ../patches/gamesummary.inc.patch
git diff --relative c96430ca8e5e57698a82738d0156fbfa2fc70843:./current_rules.inc current_rules.inc > ../patches/current_rules.inc.patch
git diff --relative c96430ca8e5e57698a82738d0156fbfa2fc70843:./header_base.inc header_base.inc > ../patches/header_base.inc.patch
git diff --relative c96430ca8e5e57698a82738d0156fbfa2fc70843:./current_players_row.inc current_players_row.inc > ../patches/current_players_row.inc.patch
git diff --relative c96430ca8e5e57698a82738d0156fbfa2fc70843:./current_players.html current_players.html > ../patches/current_players.html.patch
git diff --relative c96430ca8e5e57698a82738d0156fbfa2fc70843:./current_player_row.inc current_player_row.inc > ../patches/current_player_row.inc.patch
git diff --relative c96430ca8e5e57698a82738d0156fbfa2fc70843:./current.html current.html > ../patches/current.html.patch
cd ..
