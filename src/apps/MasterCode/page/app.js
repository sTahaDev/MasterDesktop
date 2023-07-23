

function app(){
    let lineNumber = 1;

    function addNewLine(number) { 
        let lines = $('.main');
        let content = '<div class="newLine"> <p class="lineNumber"> '+number+' </p> <input id="input'+number+'" type="text" class="line"> </div>'
        lines.append(content);
        $("#input"+number).focus();
        
        
        
    }

    function process(allFile){
        console.log(allFile);
    }
    
    $(document).ready(function () {
        
        addNewLine(lineNumber)
        lineNumber += 1;
        //Auto Focus
        $('input', this).focus();
        
        // Auto Close 
        $("input").each(function (index, element) {
            $(this).keyup(function(event) {
                
                // Eğer basılan tuşun kodu 13 (Enter tuşu) ise, input alanına istediğiniz işareti ekleyin
                if (event.which === 56) {
                  var currentValue = $(this).val(); // Mevcut input değerini alın
                  var addedSymbol = ")"; // Eklemek istediğiniz işaret
                  currentValue += addedSymbol
                  $(this).val(currentValue)
                  
                }else if(event.which == "222"){
                    var currentValue = $(this).val(); // Mevcut input değerini alın
                    var addedSymbol = '"'; // Eklemek istediğiniz işaret
                    currentValue += addedSymbol
                    $(this).val(currentValue)
                }
            });
            
        });
        
        // input event
        $('html').keypress(function (e) {
            var key = e.which || e.key
            
            
            
            if(key == 13)  // the enter key code
            {
                addNewLine(lineNumber)
                lineNumber +=1
               
            }
            
        });   
    
        $('.main').keydown(function (e) {
    
            var key = e.which || e.key
            
            
            //Up Key
            if (key == 38){
                $("input").each(function (index, element) {
                    
                    if ($(this).is(":focus")){
                     
                        if(index > 0){
                            $("input").eq(index - 1).focus();
                             
                        } 
                         
                     }
                 });
            }
            //Down Key
            if (key == 40){
                $("input").each(function (index, element) {
                    
                    if ($(this).is(":focus")){
                     
                        if(index > 0){
                            $("input").eq(index + 1).focus();
                             
                        } 
                         
                     }
                 });
            }
            // Backspace
            if (key == 8){
                $("input").each(function (index, element) {
                    
                   if ($(this).is(":focus")){
                    
                        if($(this).val() == "" && index > 0){
                            
                            $(this).parent().remove();
                            
                            $("input").eq(index - 1).focus();
                            
    
                            lineNumber = 1;
                            $(".lineNumber").each(function (index, element) {
                                $(element).text(lineNumber);
                                lineNumber += 1;
                                
                            });
                        } 
                        
                    }
                });
            }
            
        }); 
        
    
        $(".main").mousedown(function (event) { 
            if (event.which == 1){
                //Çalışmıyor şuanda
                $("#input"+(lineNumber-1)).focus();
            }   
            
        });
        
    });


    //Upload Button Click
    $(".processBtn").click(function (e) { 
        let allFile = "";
        $("input").each(function (index, element) {
            let text = $(element).val() + "\n";
            
            allFile += text;
            
        });
        process(allFile)
    });

    //Open File Button Click
    $(".openFileBtn").click(function (e) { 
        $("body").html("");
        $("body").append("<div class='openFileNew' > <div class='openFileNewAlt' > <h3>File Name</h3> <input id='inputOpenFile' /> <button id='btnOpenFile' > Open </button> </div> </div>");
        $("#btnOpenFile").click(function (e) { 
            
            window.parent.postMessage({"type":"openFile","appName":$("input").val()})
        });
    });
    

}

app();