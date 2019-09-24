#! /bin/bash

mkdir -p ./patches

cd ServerAdmin
git diff c96430ca8e5e57698a82738d0156fbfa2fc70843:gamesummary.inc gamesummary.inc > ../patches/gamesummary.inc.patch
git diff c96430ca8e5e57698a82738d0156fbfa2fc70843:current_rules.inc current_rules.inc > ../patches/current_rules.inc.patch
cd ..
