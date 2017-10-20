const {udp_json_client} = require('../dist'); // require('chunked-udp');

const client = udp_json_client('udp://127.0.0.1:41234')
client.send({msg: 'someJsonDoc', answer: 42, nested: {args: [7,3,2], op:'*'}})

if (0) {
  const alt_client = udp_json_client({port: 41234})
  const os = require('os')
  alt_client.send(os.networkInterfaces())
  alt_client.send(os.cpus())
  for (const each of os.cpus())
    alt_client.send(each)
}
