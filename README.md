# money

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
npm run test:unit
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
