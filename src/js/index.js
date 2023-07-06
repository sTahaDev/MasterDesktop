require("./src/js/jquery.min.js")
window.$ = window.jQuery = require('./src/js/jquery.min.js');

let createApp = (name,path_name)=>{
    let app = '<div id="'+name+'" class="app"> <img src="./src/images/'+path_name+'" alt=""> </div>'
    $(".appBar").append(app);
}



$(document).ready(function () {
    
    for (let index = 0; index < Apps.length; index++) {
        let {myapp} = require(Apps[index].url);
        
        createApp(myapp.name,myapp.path)
        $("#"+myapp.name).click(function (e) { 
            
            myapp.click()
        });
        
    }
});


