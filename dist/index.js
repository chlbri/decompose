
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./gitpod-new-package.cjs.production.min.js')
} else {
  module.exports = require('./gitpod-new-package.cjs.development.js')
}
