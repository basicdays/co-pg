#!/usr/bin/env bash
export DEBIAN_FRONTEND=noninteractive

# install dev tools
aptitude install --assume-yes --quiet git tmux vim-nox curl htop

# allow terminal color settings to pass thru
cat <<EOF >> /etc/ssh/sshd_config

# Accept Terminal Envs
AcceptEnv COLORFGBG
EOF
systemctl reload ssh

# add admin groups
usermod -a -G adm,systemd-journal vagrant


unset DEBIAN_FRONTEND
