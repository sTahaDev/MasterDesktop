
const {appComponent} = require("./../../ComponenManager/componentmanager")

let myapp = new appComponent("terminal","terminal.png")

myapp.click = function () { 
    
    myapp.viewScreen();
}

module.exports = {myapp};