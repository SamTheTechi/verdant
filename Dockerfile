FROM ubuntu:20.04

RUN apt-get update && \
  apt-get install -y curl unzip && \
  curl -fsSL https://bun.sh/install | bash

ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /home/verdent
RUN useradd -m admin

COPY ./frontend/ /home/verdent/frontend
COPY ./backend/ /home/verdent

WORKDIR /home/verdent/frontend

RUN bun install && bun run build

WORKDIR /home/verdent

RUN mv /home/verdent/frontend/dist ./ && rm -rf /home/verdent/frontend && bun install

RUN chown -R admin:admin /home/verdent
USER admin

ENV CORS_ORIGIN='*'

CMD ["bun", "index.ts"]

