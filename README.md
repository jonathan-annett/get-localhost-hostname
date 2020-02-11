# get-localhost-hostname

Q: when is localhost not localhost
A: under termina, on a chromebook



installation

    npm install --save github:jonathan-annett/get-localhost-hostname


example

    var hostname = require("get-localhost-hostname");
    
    
If you've started node.js on a chromebook (ie under the Terminal in linux mode), you can't point the browser at localhost - it's running under a virtual machine.

The main point of this is if you are writing command line utilities that need to point the user to a url, you might need to print one out in the console. it's helpful to know what the localhost effective hostname is.