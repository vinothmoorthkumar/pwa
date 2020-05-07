const https = require("https"),
  fs = require("fs");
const express = require('express');
const path= require('path');

const options = {
  key: fs.readFileSync("./ssl/ssl.key"),
  cert: fs.readFileSync("./ssl/ssl.cert")
};

const app = express();
const port = 80

app.use('/static', express.static('dist'))

app.use('/', express.static(path.join(__dirname, 'dist/pwatest')));


app.listen(80, () => console.log(`Example app listening at http://localhost:${80}`))

https.createServer(options, app).listen(443);
console.log('app running in '+443)
