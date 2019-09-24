#! /bin/bash

mkdir -p patches

git diff c96430ca8e5e57698a82738d0156fbfa2fc70843:ServerAdmin/gamesummary.inc ServerAdmin/gamesummary.inc > patches/gamesummary.inc.patch
git diff c96430ca8e5e57698a82738d0156fbfa2fc70843:ServerAdmin/current_rules.inc ServerAdmin/current_rules.inc > patches/current_rules.inc.patch
git diff c96430ca8e5e57698a82738d0156fbfa2fc70843:ServerAdmin/header_base.inc ServerAdmin/header_base.inc > patches/header_base.inc.patch
