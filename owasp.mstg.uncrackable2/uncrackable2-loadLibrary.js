Java.perform(function () {

//https://github.com/frida/frida/issues/434

//https://www.notsosecure.com/instrumenting-native-android-functions-using-frida/
//private native boolean function(byte[] var1) <-- This is a native function!
   
    const System = Java.use('java.lang.System');
    const Runtime = Java.use('java.lang.Runtime');
    const SystemLoad_2 = System.loadLibrary.overload('java.lang.String');
    const VMStack = Java.use('dalvik.system.VMStack');

    SystemLoad_2.implementation = function(library){
        console.log("[ + ] Loading dynamic library: " + library);
        try {
            const loaded = Runtime.getRuntime().loadLibrary0(VMStack.getCallingClassLoader(),library);
            
            if(library.includes("foo")){
                console.log("[ + ] Library foo is loaded.");
            }
            return loaded;
        } catch(ex) {
            console.log(ex);
        }

    }

//MainActivity.verify
//if(this.m.a(var3)) is true, then success
//this.m is of the CodeCheck class, containing the function a
//returns this.bar(var3.getBytes())
//Notice there is a System.loadLibrary("foo")
//lib/x86/libfoo.so
//strings on libfoo.so --> Thanks for all the fish  KEY FOUND!
});




