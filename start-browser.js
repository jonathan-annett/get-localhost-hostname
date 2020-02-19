var detect_os_name = require("./detect_os_name"); 
var this_os=detect_os_name();
var hostname=require(".");

var child_process = require("child_process") ;
var spawnSync = child_process.spawnSync;
var spawn = child_process.spawn;

function open_browser_generic(start,args){
    spawn(start,args).on('error',function(e){
       console.log("(could not auto start browser - "+e.toString()+")");
    });
}

function open_browser_chromeos(url){
    var start = "xdg-open";
    var args = [url] ;
    open_browser_generic(start,args);
}

function open_browser_linux(url){
    var start = "xdg-open";
    var args = [url] ;
    open_browser_generic(start,args);
}
 
function open_browser_wsl(url){
    var start = open_browser_wsl.which || (open_browser_wsl.which=child_process.spawnSync("which",["cmd.exe"]).output[1].toString().trim());
    var args = ["/C","start", url];
    open_browser_generic(start,args);
}
 
module.exports = function(app,port,uri) {
    var listener = app.listen(port||0,function(){
        var url="http://"+hostname+":"+listener.address().port+(uri?uri:'/');
        console.log("goto to "+url);
        module.exports.open_browser(url);
    });
};

module.exports.hostname     = hostname;
switch(this_os) {
    case "wsl"      : module.exports.open_browser = open_browser_wsl; break; 
    case "chromeos" : module.exports.open_browser = open_browser_chromeos; break;
    case "linux"    : module.exports.open_browser = open_browser_linux; break;
    default         : module.exports.open_browser = function(){console.log("(could not auto start browser - your os ("+this_os+") is not supported)");};
}
