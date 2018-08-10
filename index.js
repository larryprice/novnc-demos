const express = require('express')
const app = express()

const fs = require('fs');
const browserify = require('browserify')
const watchify = require('watchify')
const reactify = require('reactify')

const _setup = (entries, bundleName) => {
  const b = browserify({entries, cache: {}, packageCache: {}, transform: [reactify], plugin: [watchify]})
  const bundle = () => b.bundle().on('error', console.error).pipe(fs.createWriteStream(`public/${bundleName}.js`))

  b.on('update', bundle)
  bundle()
}

_setup('client/custom-vnc.js', 'bundle')
_setup('client/react-vnc.js', 'react-bundle')

app.use(express.static('public'))
app.listen(4000, () => console.log('noVNC simple app listening on port 4000'))
