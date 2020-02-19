var detect_os_name = require("./detect_os_name"); 
var this_os=detect_os_name();
var hostname=require(".");

var child_process = require("child_process") ;
var spawnSync = child_process.spawnSync;
var spawn = child_process.spawn;

function open_browser_generic(start,args,cb){
    
    var notify = typeof cb==='function' ? setTimeout(onStartup,1000): false;
    var child = spawn(start,args);
    child.on('error',onError);
    function onStartup(){
        if (!!notify) {
            clearTimeout(notify);
            notify=false;
            cb(undefined,child);
        }
    }
    
    function onError(e){
       if (notify) clearTimeout(notify);
       var err = "(could not auto start browser - "+e.toString()+")";
       if (notify) {
            notify=false;
            cb (err);
       } else {
           console.log(err);
       }
    }

    return child;
}

function open_browser_chromeos(url,cb){
    var start = "xdg-open";
    var args = [url] ;
    return open_browser_generic(start,args,cb);
}

function open_browser_linux(url,cb){
    var start = "xdg-open";
    var args = [url] ;
    return open_browser_generic(start,args,cb);
}
 
function open_browser_wsl(url,cb){
    var start = open_browser_wsl.which || (open_browser_wsl.which=child_process.spawnSync("which",["cmd.exe"]).output[1].toString().trim());
    var args = ["/C","start", url];
    return open_browser_generic(start,args,cb);
}
 
module.exports = function(app,port,uri,cb) {
    var listener = app.listen(port||0,function(){
        var url="http://"+hostname+":"+listener.address().port+(uri?uri:'/');
        console.log("goto to "+url);
        module.exports.open_browser(url,typeof cb==='function'?function(err,child){
            if (err) return cb(err);
            cb(null,child,app,port,url);
        }:undefined);
    });
};

module.exports.hostname     = hostname;
switch(this_os) {
    case "wsl"      : module.exports.open_browser = open_browser_wsl; break; 
    case "chromeos" : module.exports.open_browser = open_browser_chromeos; break;
    case "linux"    : module.exports.open_browser = open_browser_linux; break;
    default         : module.exports.open_browser = function(){console.log("(could not auto start browser - your os ("+this_os+") is not supported)");};
}
