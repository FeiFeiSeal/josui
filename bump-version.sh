#!/bin/bash


npm version patch --no-git-tag-version
VERSION=$(jq -r '.version' package.json)

git add package.json
git add package-lock.json
git commit -m "[publish]: version $VERSION"
git tag $VERSION