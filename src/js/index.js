require("./src/js/jquery.min.js")
window.$ = window.jQuery = require('./src/js/jquery.min.js');
const fs = require("fs")
const pathLib = require('path');
const fse = require('fs-extra');
let AppUrls = require("./MasterDesktop.json")


let createApp = (name,path_name)=>{
    let app = '<div id="'+name+'" class="app">  <img src="./src/images/'+path_name+'" alt=""> </div>'
    $(".appBar").append(app);
    $("#"+name).hover(function () {
            $(this).append('<p id="appName'+name+'" class="appName">'+name+'</p>');
            
        }, function () {
            $('#appName'+name).remove();
        }
    );
    
}

function copyFolder(source, target) {
    try {
        fse.copySync(source, target, { overwrite: true|false })
        console.log('success!')
        
    } catch (err) {
        console.error(err)
    }
    
}

function editIndexFile(target,appName){
    let fileString = 'const {appComponent} = require("./../../ComponenManager/componentmanager") \n \n let myapp = new appComponent("'+appName+'","paint.png") \n \n myapp.click = function () { \n myapp.viewScreen(); \n } \n \n module.exports = {myapp}'
    fs.writeFileSync(target,fileString,(err)=>{
        if (err) throw(err);
        console.log('Dosyaya başarıyla yazıldı. editIndexFile');
        

    });
    
}

function createFolder(folderName){
    fs.mkdir(folderName, (err) => {
        if (err) {
          console.error('Klasör oluşturulurken bir hata oluştu:', err);
        } else {
          console.log('Klasör başarıyla oluşturuldu.');
        }
    });
    
}



//Reading Post Massage
window.addEventListener("message", function(event) {
    let allUrls = []
    var receivedValue = event.data;
    if(receivedValue instanceof Object && receivedValue.type == "newApp"){
        fs.readFile("./MasterDesktop.json", 'utf8', (err, data) => {
            allUrls = JSON.parse(data)
            allUrls.push(JSON.parse('{"name":"'+receivedValue.appName+'","url":"./src/apps/'+receivedValue.appName+'/index.js"}'))
            console.log(allUrls);
            fs.writeFile("./MasterDesktop.json",JSON.stringify(allUrls),(err)=>{
                if (err) throw(err);
                console.log('Dosyaya başarıyla yazıldı.');
                //Klasör koyalama işlemi
                createFolder("./src/apps/"+receivedValue.appName)
                copyFolder("./exampleApp/","./src/apps/"+receivedValue.appName)
                editIndexFile("./src/apps/"+receivedValue.appName+"/index.js",receivedValue.appName)
                

            });
        });
        
       
    }
    
});


$(document).ready(function () {

    function createNewApp(data){
        
    }

    window.addEventListener("message", function(event) {
        //if (event.origin !== "http://www.example.com") return; // İframe'ın kaynak URLsini kontrol etmek için kullanabilirsiniz
  
        var value = event.data;

        if(value == "createApp"){
            createNewApp(event.data)
        }
        
        
    });
    
    $(".view").mousedown(function (event) { 
        if (event.which == 3){
            $(".miniPanel").remove();
            let content = "<div class='miniPanel' > <button id='miniPanelBtn1'>Text1</button> <button>Text2</button><button>Text2</button> </div>"
       
            $(".view").append(content);
    
           
    
            $(".miniPanel").css("top", event.pageY);
            $(".miniPanel").css("left", event.pageX);
        }   
        if(event.which == 1){
            //$(".miniPanel").remove();
        }
    });

    $("#miniPanelBtn1").click(function (e) { 
       console.log("hi");
        
    });
    let btn = document.getElementById("miniPanelBtn1")
    
    
    

    for (let index = 0; index < AppUrls.length; index++) {
        let {myapp} = require(AppUrls[index].url);
        
        createApp(myapp.title,myapp.path)
        
        $("#"+myapp.title).click(function (e) { 
            
            myapp.click()
            
            
        });
        
    }
    
    
});


