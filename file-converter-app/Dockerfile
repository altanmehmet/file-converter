FROM node:20-bullseye

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    libreoffice \
    ghostscript \
    qpdf \
    fonts-dejavu-core \
    fonts-liberation \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

RUN npm run build

RUN mkdir -p /app/tmp && chown -R node:node /app
USER node

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "run", "start"]
