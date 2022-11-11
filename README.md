# Money Split

[![Netlify Status](https://api.netlify.com/api/v1/badges/7a7c4513-1345-4197-9a2e-d786e36cf341/deploy-status)](https://app.netlify.com/sites/moneysplit/deploys)

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Test PWA

### Install **http-server** globally

```
npm install --global http-server
```

### Create certificates according to the article

https://www.freecodecamp.org/news/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec/

### Rename files

```
mv server.crt cert.pem
mv server.key key.pem
```

### Run server

```
http-server -S -C cert.pem dist
```

### Open in browser

https://localhost:8080
