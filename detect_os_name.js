var 
fs = require("fs"),
os = require("os"),
os_linux_ver,
os_linux_name,
os_index = {
    wsl      : /^Linux.*Microsoft/,
    chromeos : /^Linux.*\(Chromium\sOS/,
    linux    : /^Linux/
},
os_names = Object.keys(os_index),
os_regex = Object.values(os_index),
lookup_os_linux_name   = function() {
    os_linux_name = null;
    if (os.platform()==="linux") {
        os_linux_ver = os_linux_ver||fs.readFileSync('/proc/version','utf8');
        os_regex.some(function(re,ix){
            if (re.exec(os_linux_ver)) {
                os_linux_name = os_names[ix];
                return true;
            }
        });
    }
    lookup_os_linux_name = function() {
        return os_linux_name;    
    };
    return os_linux_name;
};


module.exports = lookup_os_linux_name;