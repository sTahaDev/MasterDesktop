window.$ = window.jQuery = require('./../js/jquery.min');

class appComponent{
    constructor(title,imgName){
        this.title = title;
        this.path = imgName;
    }

    click(){
        console.log("empty");
    }

    viewScreen(content){
        
        $(".view").append(" <div class='panel' > <div class='panelBar'> <button id='panelBar1"+this.title+"' class='panelBar1'>  </button> <button class='panelBar2'>  </button> </div>  <div class='panelView'> "+content+" </div>  </div> ");
        $("#panelBar1"+this.title).click(function (e) { 
            
            $(this.parentElement.parentElement).remove();
            
        });
        
    }
}

module.exports = {appComponent}