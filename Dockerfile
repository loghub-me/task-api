FROM oven/bun:1.3 AS build

WORKDIR /app
COPY package.json bun.lock tsconfig.json ./
RUN bun install --frozen-lockfile

COPY ./src ./src
ENV NODE_ENV=production
RUN bun build:compile

FROM gcr.io/distroless/cc-debian12 AS run

WORKDIR /app
COPY --from=build /app/server server
COPY --from=build /app/node_modules/@img /app/node_modules/@img
COPY --from=build /app/node_modules/jsdom /app/node_modules/jsdom

ENV NODE_ENV=production
CMD ["./server"]

