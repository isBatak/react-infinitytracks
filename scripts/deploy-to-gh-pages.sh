#!/bin/bash
set -o errexit

rm -rf storybook-static

# config
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"

# build (CHANGE THIS)
yarn build-storybook

# deploy
cd storybook-static
git init
git add .
git commit -m "Deploy to Github Pages"
git push --force --quiet "https://${GITHUB_TOKEN}@$github.com/${GITHUB_REPO}.git" master:gh-pages > /dev/null 2>&1
