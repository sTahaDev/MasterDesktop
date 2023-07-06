const {appComponent} = require("./../../ComponenManager/componentmanager")

let myapp = new appComponent("terminal","terminal.png")

myapp.click = function () { 
    let content = " <input/> "
    myapp.viewScreen(content);
}

module.exports = {myapp};