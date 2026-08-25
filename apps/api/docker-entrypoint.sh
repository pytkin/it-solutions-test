#!/bin/sh
set -eu

./node_modules/.bin/prisma generate --schema prisma/schema.prisma
./node_modules/.bin/prisma migrate deploy --schema prisma/schema.prisma
./node_modules/.bin/tsx prisma/seed.ts

exec node dist/main.js
