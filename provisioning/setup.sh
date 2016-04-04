#!/usr/bin/env bash
export DEBIAN_FRONTEND=noninteractive
user=vagrant
pg_version=9.4
pg_dir=/etc/postgresql/${pg_version}/main


# Update distro
aptitude update --assume-yes --quiet
aptitude safe-upgrade --assume-yes --quiet


# Add node.js apt repository
aptitude install --assume-yes --quiet apt-transport-https
wget --quiet --output-document=- https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -
echo 'deb https://deb.nodesource.com/node_4.x jessie main' > /etc/apt/sources.list.d/nodesource.list
echo 'deb-src https://deb.nodesource.com/node_4.x jessie main' >> /etc/apt/sources.list.d/nodesource.list


# Add packages for running and building application
aptitude update --assume-yes --quiet

# postgresql-contrib: for additional extensions (e.g. adminpack)
# last line for dev tooling
aptitude install --assume-yes --quiet \
    ntp build-essential nodejs \
    postgresql postgresql-client postgresql-contrib postgresql-server-dev-${pg_version} \
    git tmux vim-nox curl htop


# Setup database access, allow host system to connect
sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" "${pg_dir}/postgresql.conf"
echo "host all vagrant all md5" >> "${pg_dir}/pg_hba.conf"
systemctl reload postgresql


# update to npm3
npm install --global npm


# Cleanup
unset DEBIAN_FRONTEND
