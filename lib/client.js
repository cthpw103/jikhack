const Collection = require("./Collection");
const process = require("process");
const { promisify } = require("util");
const { readdir } = require("fs");
const prettyDate = require("../util/prettyDate");
const cmodule = require("./cmodule");
const mem = require("memoryjs");
const chalk = require("chalk");

class jikhack {
    constructor(processName) {
        this.processName = processName;
        this.process = null;
        this.clientModule = null;
        this.engineModule = null;
        this.modules = new Collection(cmodule);
        this.mem = mem;
    }
    writeMemory(adress, value, datatype) {
        return mem.writeMemory(this.process.handle, adress, value, datatype);
    }

    readMemory(adress, datatype) {
        return mem.readMemory(this.process.handle, adress, datatype);
    }

    async findProcess() {
        while (!this.process) {
            try {
                this.process = mem.openProcess(this.processName);
            } catch (err) {}
        }
        return this.process;
    }

    async findModules() {
        while (!this.clientModule || !this.engineModule) {
            try {
                this.clientModule = mem.findModule("client_panorama.dll", this.process.th32ProcessID);
                this.engineModule = mem.findModule("engine.dll", this.process.th32ProcessID);
            } catch (err) {}
        }
        this.clientBase = this.clientModule.modBaseAddr;
        this.enginetBase = this.engineModule.modBaseAddr;
        return;
    }

    async loadCModules(path) {
        path = `${process.cwd()}/${path}`;
        const items = await promisify(readdir)(path);
        items.forEach(async item => {
            let cmodule;
            try {
                cmodule = require(`${path}/${item}`);
            } catch (err) {
                console.log(`${chalk.blue(`[${prettyDate(new Date())}]`)} ${chalk.red(`Error while loading ${item}: \n${err}`)}`);
                return
            }
            this.modules.add(new cmodule(this, item.match(/(.+)\.js$/)[1].toLowerCase()))
            let currentCModule = this.modules.find(m => m.id == item.match(/(.+)\.js$/)[1].toLowerCase());
            console.log(`${chalk.blue(`[${prettyDate(new Date())}]`)} ${chalk.green(`Loaded module ${currentCModule.id}`)}`);
        })
    }
}
module.exports = jikhack;