Java.perform(function () {
    console.log("[ * ] Starting implementation override...");
    //obtain reference of the activity currently running
    var MainActivity = Java.use("infosecadventures.fridademo.utils.PinUtil");
    //obtain reference of the function which needs to be called
    MainActivity.checkPin.implementation = function(pin){
        console.log("[ + ] PIN check successfully bypassed!")
        return true;
    }
});