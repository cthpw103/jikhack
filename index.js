// mem man
let jikhack = require("./lib/client");
let client = new jikhack("csgo.exe");

console.log("waiting for csgo...")
client.findProcess()
console.log("csgo process found")

console.log("waiting for game modules...")
client.findModules();
console.log(`modules found, client adress: ${client.clientModule.modBaseAddr} engine adress: ${client.engineModule.modBaseAddr}`)

// load every cheat module
client.loadCModules("modules");

setInterval(() => {
    client.modules.forEach(m => {
        m.run();
    })
}, 10)