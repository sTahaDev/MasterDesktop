
// initalize 
$(document).click(function () {
  if (!input.is(':focus')) {
      input.focus();
  }
})

let audio = new AudioContext();
function beep(){
  let osc = audio.createOscillator();
  let gain = audio.createGain();
  osc.connect(gain);
  gain.connect(audio.destination);
  gain.gain.value = 0.07;
  osc.start(audio.currentTime);
  osc.stop(audio.currentTime + 0.1);
}

let input = $('#input');
let history = $('#history');

let count = 0
let command_history = [""]

let defaultApps = ["terminal","paint","MasterCode"];



// constants
const prompt = `<span class="user">you@larei</span><span class="symbols">:</span><span class="directory">~</span><span class="symbols">$</span>&nbsp;`;



const commands = {
  'help': 'guess what?',
  'clear': 'clears the terminal history.',
  'close':'Closes Windows And Apps',
  "create-new-app":"Create New Apps For Master Desktop"
}


// controller func
function cmd_controller(input_value) {
  let [cmd, ...args] = input_value
      .split(' ')
      .filter((arg) => {return arg.trim() !== ""})

  if (cmd == undefined) {
      null
  } else {
      command_history.push(input_value)

      if (Object.keys(commands).includes(cmd)) {
          if (cmd == 'help') {
              history.append(Object.entries(commands)
                  .map(command => command.join(': '))
                  .join('<br>')
              )
          
          } else if (cmd == 'clear') {
              history.html('')
          
          }else if(cmd == "close"){
            if(args[0] != "terminal"){
                $("#panel"+args[0],window.parent.document).remove();
                history.append("Successfully Closed: "+args[0]);
                window.parent.postMessage("closeWindow");    
            }else{
                history.append("Terminal cant't close with here.")
            }
            
          }else if(cmd == "create-new-app"){

                let isCanCreate = true;
                
                

                defaultApps.forEach(element => {
                    if (element == args[0]){
                        isCanCreate = false
                    }
                });

                if (isCanCreate){
                    window.parent.postMessage({"type":"newApp","appName":args[0]})
                    history.append("Successfully Created New App: " + args[0]+".  ")
                    history.append("Please ReStart MasterDesktop")
                }else{
                    history.append("Error: File Already Using")
                }
        
            }
          
        
        
          
      } else {
          history.append(`error: command not found: ${cmd}. Try 'help' to get started.`)
      }
  }
}

// input event
$('#prompt').html(prompt)
input.keydown(function (event) {
  let key = event.which;
  let input_value = input.val()

  if (key == 13) { // enter
      history.append(prompt + input_value);
      history.append('<br>');
      cmd_controller(input_value)
      history.append(history.html() && input_value ? '<br>' : '');

      input.val('');
  }

  if (key == 38) { // arrow up - next
      if (count > -command_history.length + 1) {
          count -= 1
      } else {
          beep()
      }

      input.val(command_history.at(count))
  }

  if (key == 40) { // arrow down - previous
      if (count < 0) {
          count += 1
          input.val(command_history.at(count))
      } else {
          beep()
      }
  }

  

  $(".terminal").scrollTop($(".terminal")[0].scrollHeight);
});