const {appComponent} = require("./../../ComponenManager/componentmanager") 
 
 let myapp = new appComponent("paint2","paint.png") 
 
 myapp.click = function () { 
 myapp.viewScreen(); 
 } 
 
 module.exports = {myapp}