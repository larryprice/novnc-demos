const express = require('express')
const app = express()

const fs = require('fs');
const browserify = require('browserify');
const watchify = require('watchify');

const b = browserify({entries: ['client/custom-vnc.js'], cache: {}, packageCache: {}, plugin: [watchify]})
const bundle = () => b.bundle().pipe(fs.createWriteStream('public/bundle.js'))

b.on('update', bundle);
bundle();

app.use(express.static('public'))
app.listen(4000, () => console.log('noVNC simple app listening on port 4000'))
