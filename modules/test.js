const cmodule = require("../lib/cmodule");
const offsets = require("../lib/offsets");
const mem = require("memoryjs")

class testModule extends cmodule {
    constructor(...args) {
        super(...args, null)
    }
    async run() {
        let dwLocalPlayer = this.client.readMemory(this.client.clientBase+offsets.dwLocalPlayer, mem.INT);
        let iHealth = this.client.readMemory(dwLocalPlayer+offsets.m_iHealth, mem.INT);
        console.log(`HP: ${iHealth}`)
    }
}

module.exports = testModule;