const {appComponent} = require("./../../ComponenManager/componentmanager") 
 
 let myapp = new appComponent("myapp","paint.png") 
 
 myapp.click = function () { 
 myapp.viewScreen(); 
 } 
 
 module.exports = {myapp}