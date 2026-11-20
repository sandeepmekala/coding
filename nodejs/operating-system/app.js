const os = require('os');

console.log('Platform:      ', os.platform());
console.log('Architecture:  ', os.arch());
console.log('Hostname:      ', os.hostname());
console.log('Home dir:      ', os.homedir());
console.log('Temp dir:      ', os.tmpdir());
console.log('Total memory:  ', (os.totalmem() / 1024 ** 3).toFixed(2), 'GB');
console.log('Free memory:   ', (os.freemem() / 1024 ** 3).toFixed(2), 'GB');
console.log('CPU count:     ', os.cpus().length);
console.log('CPU model:     ', os.cpus()[0].model);
console.log('Uptime:        ', (os.uptime() / 3600).toFixed(2), 'hours');
