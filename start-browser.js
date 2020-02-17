
var 

hosthame=require(".");

module.exports = function(app,port,uri) {
    var listener = app.listen(port||0,function(){
        var url="http://"+hostname+":"+listener.address().port+(uri?uri:'/');
        console.log("goto to "+url);
        var start = require("os").platform()==="linux" ? "xdg-open" : "cmd.exe";
        var args = start === "xdg-open" ? [url] : ["/C","start", url];
        require("child_process")
            .spawn(start,args)
               .on('error',function(){
                   console.log("(could not auto start browser)")
               });
            
    });
}