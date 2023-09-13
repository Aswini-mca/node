const os=require('os')

console.log("Free Memory", os.freemem() / 1024 / 1024 / 1024)
console.log("Total Memory", os.totalmem() / 1024 / 1024 / 1024)
console.log("Version", os.version())
console.log("User Info", os.userInfo());
console.log("Platform", os.platform());
console.log("Processor", os.cpus())
console.log(`Processor, ${os.cpus().length} Core`);
console.log("uptime", os.uptime());
console.log("arch", os.arch());
const sum=(num)=>num * 2;
console.log(sum(10));