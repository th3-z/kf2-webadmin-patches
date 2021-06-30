#! /bin/bash

# Removes filepath from diff output
SED_PATTERN="s/\.\/(original|modified)\//\.\//"

OUTPUT_PATH=patches/

rm -rf ./patches
mkdir -p ./patches
mkdir ./original

tar xvzf ./original.tar.gz -C ./original &>/dev/null

for filename in ./modified/*; do
    md5original=$(md5sum ./original/${filename##*/} | sed "s/\s.*//")
    md5modified=$(md5sum ./modified/${filename##*/} | sed "s/\s.*//")
    
    if [[ "$md5original" != "$md5modified" ]]; then
        echo "Generating patch: patches/${filename##*/}.patch"
        diff -u ./original/${filename##*/} ./modified/${filename##*/} | sed -E "$SED_PATTERN" > $OUTPUT_PATH${filename##*/}.patch
    fi
done

rm -rf ./original
