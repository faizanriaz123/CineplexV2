# Dockerfile adapted from
# https://mherman.org/blog/dockerizing-a-react-app/

# Build the React app
# basically, this compiles the React jsx to static HTML and js files.
FROM node:14-alpine3.14 as build
WORKDIR /
ENV PATH ./node_modules/.bin:$PATH
COPY ./package.json ./
RUN npm i --legacy-peer-deps
COPY . .
RUN npm run build

# Serve these static files with NGINX.
EXPOSE 3000
CMD ["react-scripts", "start"]