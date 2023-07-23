const {appComponent} = require("./../../ComponenManager/componentmanager")

let myapp = new appComponent("paint","paint.png")

myapp.click = function () { 
    
    myapp.viewScreen();
}

module.exports = {myapp};