# stage one
FROM oven/bun:slim AS builder

RUN apt-get update


# stage two
FROM builder AS server-builder

WORKDIR /server-builder

COPY ./backend/package.json ./backend/bun.lockb ./

RUN bun i

COPY ./backend/ ./


# stage three
FROM builder AS app-builder

WORKDIR /app-builder

COPY ./frontend/package.json ./frontend/bun.lock ./

RUN bun i

COPY ./frontend/ .

RUN bun run build


# final destination !!!
FROM oven/bun:slim

RUN useradd -m admin

WORKDIR /app

COPY --from=app-builder /app-builder/dist ./dist
COPY --from=server-builder /server-builder/node_modules ./node_modules
COPY --from=server-builder /server-builder ./

RUN chown -R admin:admin /app
USER admin

ENV CORS_ORIGIN='*'

CMD ["bun", "index.ts"]

