Java.perform(function () {
    console.log("[ * ] Starting PIN Brute-force, please wait...")
    var PinUtil = Java.use("infosecadventures.fridademo.utils.PinUtil");
 
    for(var i=1000; i < 9999; i++)
    {
        if(PinUtil.checkPin(i+"") == true){
            console.log("[ + ] Found correct PIN: " + i);
        }
    }
});