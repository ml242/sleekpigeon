#!/bin/bash

set -eu

envsubst '${API_KEY}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"
