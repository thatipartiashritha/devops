FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build argument from GitHub Actions
ARG REACT_APP_MOVIE_API_URL

# Make it available to React build
ENV REACT_APP_MOVIE_API_URL=$REACT_APP_MOVIE_API_URL

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]