import frida,sys
import codecs
import threading
import pdb
TARGET_APP = 'owasp.mstg.uncrackable2'

#Function to read JS into a string
def getJS(filepath):
	with open(filepath,'r') as f:
		jscode = f.read()
		return jscode

#Argument handling // returns the path to JS file.
def checkArgs():
	if len(sys.argv) != 2:
		print("Error: script requires two arguments.\n\tpython app_frida.py /path/to/script.js")
		sys.exit(1)
	return sys.argv[1]

#Prints error message with script.on() event handler.  Bit of magic here.
def my_message_handler(message, payload):
	print(f"Message: {message}\nPayload: {payload}")

#Input a frida session and path to JavaScript file and load the script into the session.
def loadJS(session, jsPath):
	#Run JavaScript to interface with Java functions.
	script = session.create_script(getJS(jsPath))
	script.on("message", my_message_handler)
	#Do magic.
	print("[ * ] Running Frida Demo App")
	script.load()


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
	loadJS(session,jsPath)

#If not, spawn process
except:
	print("[ * ] No process detected.  Spawning process.")
	pid = device.spawn([TARGET_APP])
	session = device.attach(pid)
	loadJS(session,jsPath)
	#According to stackoverflow, this is needed when you spawn a process. https://stackoverflow.com/questions/36680128/frida-spawn-process-failed-on-android
	device.resume(pid)


loadJS(session,"uncrackable2-loadLibrary.js")

loadJS(session,"uncrackable2-overrideLibrary.js")
sys.stdin.read()