var 
os = require("os"),
lookup_os_linux_name   = require("./detect_os_name"),
//chromebooks do something funky with localhost under penguin/crostini, so help a coder out....
hostname = module.exports = (isChromebook() ? "penguin.termina.linux.test" : "localhost");


function isChromebook() {
    
    if (lookup_os_linux_name()==='chromeos') return true;
    
    if (os.hostname()==="penguin" && os.platform()==="linux") {
        var run=require("child_process").execSync;
        try {
            var cmd = run ("which systemd-detect-virt").toString().trim();
            return (run(cmd).toString().trim()==="lxc");
        } catch (e) {

        }
    }
    return false;
}

