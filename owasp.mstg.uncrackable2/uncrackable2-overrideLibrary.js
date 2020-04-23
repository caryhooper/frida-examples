Interceptor.attach(Module.findExportByName("libfoo.so",
    "owasp_mstg_uncrackable2_bar"),{
        onEnter: function (args){
            console.log("Inside of owasp_mstg_uncrackable2_foo_bar");
        },
        onLeave: function (retval) {
            retval.replace(0);
            console.log("Inside onLeave");
 }