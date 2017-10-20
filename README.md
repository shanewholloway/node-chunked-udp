# chunked-udp
Client and server utilities for chunked UDP messaging, inspired by GELF+UDP


### example client

```javascript
const {udp_json_client} = require('../dist'); // require('chunked-udp');

const client = udp_json_client('udp://127.0.0.1:41234')

client.send({msg: 'someJsonDoc', answer: 42, nested: {args: [7,3,2], op:'*'}})
```

Or you can pass `port` and `address` down explicitly:

```javascript
const client = udp_json_client({address: '127.0.0.1', port: 41234})
```

### example server

```javascript
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
const msg_parse_context = udp_json_parser(inflightMessages, on_udp_message);

function on_udp_message(err, msg, rinfoList) {
  if (err)
    console.log('on_message ERROR', err);
  else console.log('on_message', msg);
}
```

