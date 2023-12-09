

function app() {
    let lineNumber = 1;
    let currentPage = ""
    let currentAppName = ""

    function addNewLine(number) {
        let lines = $('.main');
        let content = '<div class="newLine"> <p class="lineNumber"> ' + number + ' </p> <input id="input' + number + '" type="text" class="line"> </div>'
        lines.append(content);
        $("#input" + number).focus();



    }
    //Bunu Sadece Seri Line Ekleme için kullanıyorum
    function createNewLine(string, number) {
        let lines = $('.main');
        let content = '<div class="newLine"> <p class="lineNumber"> ' + number + ' </p> <input id="input' + number + '" type="text" class="line"> </div>'
        lines.append(content);
        $("#input" + number).val(string);
    }

    function upload(currentAppName, currentPage, allFile) {
        console.log(allFile);
        window.parent.postMessage({ "type": "upload", "fileName": currentPage, "fileString": allFile, "appName": currentAppName })
    }

    function addNewStringToPage(pageString) {
        let stringArray = pageString.split("\n")
        for (let index = 0; index < stringArray.length; index++) {
            createNewLine(stringArray[index], lineNumber)
            lineNumber += 1;

        }
    }

    $(document).ready(function () {

        addNewLine(lineNumber)
        lineNumber += 1;
        //Auto Focus
        $('input', this).focus();

        // Auto Close 
        $("input").each(function (index, element) {
            $(this).keyup(function (event) {

                // Eğer basılan tuşun kodu 13 (Enter tuşu) ise, input alanına istediğiniz işareti ekleyin
                if (event.which === 56) {
                    var currentValue = $(this).val(); // Mevcut input değerini alın
                    var addedSymbol = ")"; // Eklemek istediğiniz işaret
                    currentValue += addedSymbol
                    $(this).val(currentValue)

                } else if (event.which == "222") {
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



            if (key == 13)  // the enter key code
            {
                addNewLine(lineNumber)
                lineNumber += 1

            }

        });

        $('.main').keydown(function (e) {

            var key = e.which


            //Up Key
            if (key == 38) {
                $("input").each(function (index, element) {

                    if ($(this).is(":focus")) {

                        if (index > 0) {

                            $("input").eq(index - 1).focus();

                        }

                    }
                });
            }
            //Down Key
            if (key == 40) {
                let deneme = false;
                $("input").each(function (index, element) {

                    if ($(this).is(":focus")) {

                        if (!deneme) {
                            $("input").eq(index + 1).focus();
                            deneme = !deneme
                        }

                    }
                });
            }
            // Backspace
            if (key == 8) {
                $("input").each(function (index, element) {

                    if ($(this).is(":focus")) {

                        if ($(this).val() == "" && index > 0) {

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




    });


    //Upload Button Click
    $(".uploadBtn").click(function (e) {
        let allFile = "";
        $("input").each(function (index, element) {
            let text = $(element).val() + "\n";

            allFile += text;

        });

        upload(currentAppName, currentPage, allFile)
        window.parent.postMessage({ "type": "openFile", "appName": currentAppName })
        
    });

    //Open File Button Click
    $(".openFileBtn").click(function (e) {

        $("body").append("<div class='openFileNew' > <div class='openFileNewAlt' > <h3>File Name</h3> <input id='inputOpenFile' /> <button id='btnOpenFile' > Open </button> </div> </div>");
        $("#btnOpenFile").click(function (e) {

            window.parent.postMessage({ "type": "openFile", "appName": $("#inputOpenFile").val() })
            currentAppName = $("#inputOpenFile").val();
        });
        window.addEventListener("message", function (event) {
            let value = event.data;

            if (value.type == "closeNewFilePage") {
                $(".files").html("");
                $(".files").append('<div id="file-text-indexjs" class="file-text"><p>index.js</p></div>');
                $(".files").append('<div id="file-text-indexhtml" class="file-text"><p>index.html</p></div>');
                $(".files").append('<div id="file-text-appjs" class="file-text"><p>app.js</p></div>');
                $(".files").append('<div id="file-text-stylecss" class="file-text"><p>style.css</p></div>');

                $(".openFileNew").remove();

                $("#file-text-indexjs").click(function (e) {
                    $(".main").html("");
                    lineNumber = 1;
                    addNewStringToPage(value.indexjs)
                    currentPage = "indexjs"

                });
                $("#file-text-indexhtml").click(function (e) {
                    $(".main").html("");
                    lineNumber = 1;
                    addNewStringToPage(value.indexhtml)
                    currentPage = "indexhtml"

                });
                $("#file-text-appjs").click(function (e) {
                    $(".main").html("");
                    lineNumber = 1;
                    addNewStringToPage(value.appjs)
                    currentPage = "appjs"

                });
                $("#file-text-stylecss").click(function (e) {
                    $(".main").html("");
                    lineNumber = 1;
                    addNewStringToPage(value.stylecss)
                    currentPage = "stylecss"

                });
            }



        });
    });


}

app();