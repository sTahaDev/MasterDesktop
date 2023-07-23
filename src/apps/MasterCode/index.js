
const {appComponent} = require("./../../ComponenManager/componentmanager")

let myapp = new appComponent("MasterCode","vscode.png")

myapp.click = function () { 
    
    myapp.viewScreen();
}

module.exports = {myapp};