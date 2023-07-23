
const {appComponent} = require("./../../ComponenManager/componentmanager")

let myapp = new appComponent("your app Name","paint.png")

myapp.click = function () { 
    
    myapp.viewScreen();
}

module.exports = {myapp};