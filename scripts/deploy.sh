#! /bin/bash

: "Prepare SSH Key for Github" && {
  openssl aes-256-cbc -K $encrypted_3052b21f39dc_key -iv $encrypted_3052b21f39dc_iv -in travis_key.enc -out ~/.ssh/id_rsa -d
  chmod 600 ~/.ssh/id_rsa
  echo -e "Host github.com\n\tIdentityFile  ~/.ssh/id_rsa\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
}

: "Git Settings" && {
  git config --global user.email "6715229+Himenon@users.noreply.github.com"
  git config --global user.name "Himenon"
}

: "Before script of Deploy" && {
  yarn install
  yarn build
}

: "Deploy task" && {
  echo '//registry.npmjs.org/:_authToken="${NPM_TOKEN}"' >> .npmrc
  npm publish
  yarn run ci:notify:release
}

: "After script of Deploy" && {
  cp .npmrc.template .npmrc
}

: "Push Tag" && {
  git push origin --tags
}

: "Github Release" && {
  echo "TODO Release Task"
}

