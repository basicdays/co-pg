#!/usr/bin/env bash
user=vagrant
db_pw=vagrant
db_name=co_pg
proj_dir=/vagrant
cores=$(nproc)
make_options="--directory=${proj_dir} --no-builtin-rules --no-builtin-variables -j${cores}"

sudo --user=postgres psql <<SQL
create role ${user} with superuser createdb createrole login password '${db_pw}';
create database ${db_name} with owner ${user};
create extension adminpack;
\connect ${db_name};
create extension adminpack;
SQL
sudo --user=${user} psql -d ${db_name} -f test/migrate.sql

# Setup Project
sudo --user=${user} make ${make_options} build
