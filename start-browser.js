
var 

hostname=require("."),
lookup_os_linux_name   = require("./detect_os_name");

module.exports = function(app,port,uri) {
    var listener = app.listen(port||0,function(){
        var url="http://"+hostname+":"+listener.address().port+(uri?uri:'/');
        console.log("goto to "+url);
        var browser = (lookup_os_linux_name()==='wsl') ? "cmd.exe" : "xdg-open" ;
        var args = browser === "xdg-open" ? [url] : ["/C","start", url];
        require("child_process")
            .spawn(browser,args)
               .on('error',function(){
                   console.log("(could not auto start browser)")
               });
            
    });
}