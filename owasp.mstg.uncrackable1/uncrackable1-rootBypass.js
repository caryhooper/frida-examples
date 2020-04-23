Java.perform(function () {
    console.log("[ * ] Starting implementation override...");
    //obtain reference of the activity currently running
    var rootDetection = Java.use("sg.vantagepoint.a.c");
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
});