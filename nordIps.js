const fs = require('fs');
const execa = require('execa');
const chalk = require('chalk');

let ip = []
let ipPass = 0
let s = { //settings
  pingTimeout: 5,
  pingAmount: 10 // 'all' or amount
}

let serverList = fs.readdirSync('/etc/openvpn/ovpn_tcp/')

serverList.forEach(function(item, i, arr) {
  serverList[i] = '/etc/openvpn/ovpn_tcp/' + item
})


for (let i = 0; i < serverList.length; i++) {
  let data = fs.readFileSync(serverList[i]) + ''
  serverList[i] = serverList[i].split('/').slice(4).toString().split('.').slice(0,1).toString()
  data = data.split('\n',4)
  data = data[3].substring(7)
  let port = data.indexOf(' 443');
  data = data.slice(0, port)
  ip.splice(0, 0, data)
}


console.log('Have ' + ip.length + ' servers')
// console.log('Working...')
if (s.pingAmount != 'all' && typeof s.pingAmount != '') {
  ip.splice(s.pingAmount)
  console.log('Now ' + ip.length + ' servers');
}


for (let i = 0; i < ip.length; i++) {
  load.text = ip[i];
 (async () => {
    try {
      // console.log('Cheking ' + ip[i]);
      await execa.shell('ping -c 1 -W ' + s.pingTimeout + ' ' + ip[i])
      console.log(chalk.green('Ping pass ') + ip[i] + ' ' + serverList[i])
    } catch (e) {
      // console.log(ip[i] + ' no ping');
    }
  })()
}