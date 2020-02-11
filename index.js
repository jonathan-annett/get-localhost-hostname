
var
//chromebooks do something funky with localhost under penguin/crostini, so help a coder out....
hostname = module.exports = (isChromebook() ? "penguin.termina.linux.test" : "localhost");

function isChromebook() {
    var os = require("os");
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

