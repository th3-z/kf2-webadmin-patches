# KF2 Web Admin Patches
Generates KF2 Server patches for KF2 Magicked Admin and other popular admin panel modifications.

## Features

The main purpose of this is to add support for KF2 Magicked Admin in all other game modes other than Survival ( like Endless, Weekly, Zedternal, ect... ). It also adds the following to KF2 Server's web admin panel.

* Wave counter in Endless mode's game ticker
* Wave counter in Endless mode's rule list
* Difficulty in Endless mode's rule list
* Allows to see the level of players in "Server Info" and "Players"

## Usage

Running `gen-patches.sh` will generate patches that apply the difference for the files in `ServerAdmin`. The
patches are output be output in a `patches` folder.

The generated patches can be copied into KF2 Magicked Admin's `admin-patcher/patches`
folder to apply them with the admin-patcher or applied manually with `patch`.

## License

Script and ServerAdmin modifications are released under the terms of the MIT license.
Original ServerAdmin files are property of Tripwire Interactive.
