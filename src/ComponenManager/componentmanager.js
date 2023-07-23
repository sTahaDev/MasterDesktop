window.$ = window.jQuery = require('./../js/jquery.min');
require('jquery-ui-dist/jquery-ui');

const fs = require("fs");

class appComponent{
    constructor(title,imgName){
        this.title = title;
        this.path = imgName;
        this.isOpened = false;
        this.isFull = false
    }

    click(){
        console.log("empty");
    }
    
    
    viewScreen(){
        let that = this;
        
        let content = '<iframe src="./src/apps/'+this.title+'/page/index.html" frameborder="0" allowfullscreen" style="width:100%;height:100%;"></iframe>'
        if(this.isOpened == false){
            $(".view").append(" <div class='panel' id='panel"+this.title+"' > <div class='panelBar'> <button id='panelBar1"+this.title+"' class='panelBar1'>  </button> <button id='panelBar2"+this.title+"' class='panelBar2'>  </button> </div>  <div class='panelView'> "+content+" </div>  </div> ");
            this.isOpened = true;
        }

        //Reading Post Massage
        window.addEventListener("message", function(event) {
      
            var receivedValue = event.data;
            if(receivedValue == "closeWindow"){
                that.isOpened = false;
                
            }
            
        });
        
        $("#panelBar1"+this.title).click(function (e) { 
            
            
            $(this.parentElement.parentElement).remove();
            that.isOpened = false;
            
        });
        $("#panelBar2"+this.title).click(function (e) { 
            
            
            if(that.isFull == false){
                $("#panel"+that.title).css("width", "100%");
                $("#panel"+that.title).css("height", "100%");

                that.isFull = !that.isFull
            }else{
                $("#panel"+that.title).css("width", "1000px");
                $("#panel"+that.title).css("height", "600px");

                that.isFull = !that.isFull
            }
            
        });
        
        $( ".panel" ).draggable();

        
        
    }
}

module.exports = {appComponent}