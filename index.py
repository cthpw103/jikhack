# mem man
import client
import threading
import time

client.run("csgo.exe");

print("waiting for csgo...")
client.findProcess()
print("csgo process found")

print("waiting for game modules...")
client.findModules();
print("modules found, client adress: "+client.clientModule.modBaseAddr+" engine adress: "+ client.engineModule.modBaseAddr)

# load every cheat module
client.loadCModules("modules");

def hack(*args):
    for m in client.modules:
        m.run()

    next=int(args[0])+1
    threading.Timer(0.001, hack,[str(next)]).start()

hack("1")
