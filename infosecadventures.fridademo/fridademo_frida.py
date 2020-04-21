import frida,sys
import codecs
import threading
import pdb
TARGET_APP = 'infosecadventures.fridademo'
#python C:\Users\Cary\.android\frida-examples\uncrackable-1\uncrackable_frida.py
# Logging function for spawned process

#Function to read JS into a string
def getJS(filepath):
	with open(filepath,'r') as f:
		jscode = f.read()
		return jscode

#Argument handling // returns the path to JS file.
def checkArgs():
	if len(sys.argv) != 2:
		print("Error: script requires two arguments.\n\tpython frida.py /path/to/script.js")
		sys.exit(1)
	return sys.argv[1]

#Check arguments and save path to JS file
jsPath = checkArgs()
#Enumerate all android devices and return array of all devices.
devices = frida.get_device_manager().enumerate_devices()
#Select device
device = devices[2]
#Attach to target process if running already
try:
	print("[ * ] Attaching to current process.")
	session = device.attach(TARGET_APP)
	wasSpawned = True
#If not, spawn process
except:
	print("[ * ] No process detected.  Spawning process.")
	pid = device.spawn([TARGET_APP])
	session = device.attach(pid)
	wasSpawned = False
#Run JavaScript to interface with Java functions.
script = session.create_script(getJS(jsPath))

#Do magic.
print("[ * ] Running Frida Demo App")
script.load()
if not wasSpawned:
	#According to stackoverflow, this is needed when you spawn a process. https://stackoverflow.com/questions/36680128/frida-spawn-process-failed-on-android
	device.resume(pid)
sys.stdin.read()