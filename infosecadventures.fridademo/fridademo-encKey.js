Java.perform(function () {
    console.log("[ * ] Starting implementation override...");
    //obtain reference of the activity currently running
    var MainActivity = Java.use("infosecadventures.fridademo.utils.EncryptionUtil");
    //obtain reference of the function which needs to be called
    MainActivity.encrypt.implementation = function(key,input){
        console.log("[ + ] Encrypt function hooked... key is " + key);
        return "foobarh00p";
    }
});