Java.perform(function () {
    console.log("[ * ] Starting implementation override...");
    //Note: Same root detection methods as the first "uncrackable 1"
    //obtain reference of the activity currently running
    var rootDetection = Java.use("sg.vantagepoint.a.b");
    //replace the original implementation of the function with ours.
    rootDetection.a.implementation = function(){
        console.log("[ + ] Root detection #1 ($PATH check) successfully bypassed!");
        return false;
    }
    rootDetection.b.implementation = function(){
        console.log("[ + ] Root detection #2 (Test-Keys check) successfully bypassed!");
        return false;
    }
    rootDetection.c.implementation = function(){
        console.log("[ + ] Root detection #3 (File check) successfully bypassed!");
        return false;
    }

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


/*
    //By reverse engineering the sg.vantagepoint.a class, we see that our user input is being
    //compared to "var1".  If they match, it returns true.  If not, false.  Obviously we can
    //override this function, but what we really want is to find the secretWord.

    //var1 = sg.vantagepoint.a.a.a(input1,input2)
    //input1 is b("8d127684cbc37c17616d806cf50473cc")
    var compareWord = Java.use("sg.vantagepoint.uncrackable1.a");
    var input1 = compareWord.b("8d127684cbc37c17616d806cf50473cc");

    //input2 is Base64.decode("5UJiFctbmgbDoLXmpL12mkno8HT4Lv8dlat8FxR2GOc=", 0);
    //to include this in our JS, we need to import the Java Base64 class.
    var Base64 = Java.use("android.util.Base64");
    var input2 = Base64.decode("5UJiFctbmgbDoLXmpL12mkno8HT4Lv8dlat8FxR2GOc=", 0);

    //Now, we can call sg.vantagepoint.a.a.a and include both inputs.
    var doEncrypt = Java.use("sg.vantagepoint.a.a");
    var secretObj = doEncrypt.a(input1,input2);
    //This returns an "object".  Within the code, this is converted to a String before comparison.

    //Thus, we need to import Java's string type in order to create a new String from the object.
    var string_class = Java.use("java.lang.String");
    var secret = string_class.$new(secretObj);
    console.log("Secret: " + secret);

    */

});

await(2000);
Interceptor.attach(Module.findExportByName("libfoo.so",
    "owasp_mstg_uncrackable2_bar"),{
        onEnter: function (args){
            console.log("Inside of owasp_mstg_uncrackable2_foo_bar");
        },
        onLeave: function (retval) {
            retval.replace(0);
            console.log("Inside onLeave");
        }
});

