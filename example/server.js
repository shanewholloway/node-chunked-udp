const {createSocket} = require('dgram');
const server = createSocket('udp4')
  .on('message', (packet, rinfo) => {
      msg_parse_context(packet, rinfo);
    })
  .on('listening', () => {
      const {address, port} = server.address()
      console.log(`server listening ${address}:${port}`)
    })
  .bind(41234)


const {udp_json_parser} = require('../dist'); // require('chunked-udp');
const inflightMessages = new Map() // or, perhaps, require('hashbelt').createCachingHashbelt().autoRotate()
const msg_parse_context = udp_json_parser(inflightMessages, on_message);

function on_message(err, msg, rinfoList) {
  if (err)
    console.log('on_message ERROR', err);
  else console.log('on_message', msg);
}
