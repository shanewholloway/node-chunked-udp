const gelfserver = require('graygelf/server')

gelfserver()
  .on('error', function (err) {
      console.log('graygelf error:', err)
    })
  .on('message', function (gelf) {
      console.log([gelf._tag, new Date(gelf.timestamp*1000).toISOString(), gelf.short_message].join(' -- '))
    })
  .listen(12201) // 12201
