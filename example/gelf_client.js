const {udp_gelf_client} = require('../dist'); // require('chunked-udp');
const client = udp_gelf_client({port: 12201})
client.send({
    'version': '1.1',
    'host': 'example.org',
    'short_message': 'A short message that helps you identify what is going on',
    'full_message': 'Backtrace here\n\nmore stuff',
    'timestamp': Date.now()/1000.,
    'level': 1,
    '_user_id': 9001,
    '_some_info': 'foo',
    '_some_env_var': 'bar'
  })

client.send({
  short_message: 'hello compressed',
  timestamp: Date.now()/1000.,
  full_message: Array(8192/16).fill(' 123456789abcdef').join(''),
  level: 6 })

client.send({
  short_message: 'hello multipart compressed',
  timestamp: Date.now()/1000.,
  full_message: Array(10000).fill(' 123456789abcdef').join(''),
  level: 6 })
