Java.perform(function () {
    console.log("[ * ] Starting implementation override...");
    //obtain reference of the activity currently running
    var MainActivity = Java.use("infosecadventures.fridademo.utils.RootUtil");
    //obtain reference of the function which needs to be called
    MainActivity.isRootAvailable.implementation = function(){
        console.log("[ + ] Root detection successfully bypassed!")
        return false;
    }
});