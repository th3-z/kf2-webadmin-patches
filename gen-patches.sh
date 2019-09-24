#! /bin/bash

mkdir -p ./patches

cd ServerAdmin
git diff b20e5fa8173fe2c14123aef67eb1dd377c6a9f68:gamesummary.inc gamesummary.inc > ../patches/gamesummary.inc.patch
git diff b20e5fa8173fe2c14123aef67eb1dd377c6a9f68:current_rules.inc current_rules.inc > ../patches/current_rules.inc.patch
cd ..
