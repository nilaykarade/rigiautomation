//var final_transcript="";
if ("webkitSpeechRecognition" in window) {
    // Initialize webkitSpeechRecognition
    let speechRecognition = new webkitSpeechRecognition();

    // String for the Final Transcript
    let final_transcript = "";

    // Set the properties for the Speech Recognition object
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = document.querySelector("#select_dialect").value;

    // Callback Function for the onStart Event
    speechRecognition.onstart = () => {
        // Show the Status Element
        document.querySelector("#status").style.display = "block";
        //var txt = document.createElement('input');
        //txt.textContent = 'Hello World!';
        
        var element = document.getElementById('status');
        element.after(para);
    };
    speechRecognition.onerror = () => {
        // Hide the Status Element
        document.querySelector("#status").style.display = "none";
    };
    speechRecognition.onend = () => {
        // Hide the Status Element
        document.querySelector("#status").style.display = "none";
    };
 
    speechRecognition.onresult = (event) => {
        // Create the interim transcript string locally because we don't want it to persist like final transcript
        let interim_transcript = "";

        // Loop through the results from the speech recognition object.
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }

        // Set the Final transcript and Interim transcript.
        document.querySelector("#final").innerHTML = final_transcript;
        document.querySelector("#interim").innerHTML = interim_transcript;
    };

    // Set the onClick property of the start button
    document.querySelector("#start").onclick = () => {
        // Start the Speech Recognition
        speechRecognition.start();
    };
    // Set the onClick property of the stop button
    document.querySelector("#stop").onclick = () => {
        // Stop the Speech Recognition
        speechRecognition.stop();
    };
} else {
    console.log("Speech Recognition Not Available");
    document.querySelector("#errmsg").innerHTML="This app is compitible with Chrome browser."
}



function CreateTable() {
    
    // CREATE DYNAMIC TABLE.
    var table = document.createElement('table');

    // SET THE TABLE ID. 
    // WE WOULD NEED THE ID TO TRAVERSE AND EXTRACT DATA FROM THE TABLE.
    table.setAttribute('id', 'taskTable');
    var final_transcript=document.getElementById("final").value
    var array = final_transcript.split("task"); 
    const tasks=[];
    const duration=[];
    const desc=[];
    
    for (i = 0; i < array.length; i++) {
        if (array[i]!="")
        {
            tasks.push(array[i].split("duration")[0]);
            tasks.push(array[i].split("duration")[1].split("description")[0]);
            tasks.push(array[i].split("duration")[1].split("description")[1]);
        }
         
      } 
    //console.log(array)
    console.log(tasks)
    /*
    var arrHead = new Array();
    arrHead = ['Task', 'Duration', 'Description'];

    var arrValue = new Array();
    for (i = 0; i < tasks.length/3; i+2){
        arrValue.push([tasks[i], tasks[i+1],tasks[i+2]]);
    }
    var tr = table.insertRow(-1);

    for (var h = 0; h < arrHead.length; h++) {
        var th = document.createElement('th');              // TABLE HEADER.
        th.innerHTML = arrHead[h];
        tr.appendChild(th);
    }

    for (var c = 0; c <= arrValue.length - 1; c++) {
        tr = table.insertRow(-1);

        for (var j = 0; j < arrHead.length; j++) {
            var td = document.createElement('td');          // TABLE DEFINITION.
            td = tr.insertCell(-1);
            td.innerHTML = arrValue[c][j];                  // ADD VALUES TO EACH CELL.
        }
    }

    // NOW CREATE AN INPUT BOX TYPE BUTTON USING createElement() METHOD.
    var button = document.createElement('input');

    // SET INPUT ATTRIBUTE 'type' AND 'value'.
    button.setAttribute('type', 'button');
    button.setAttribute('value', 'Read Table Data');

    // ADD THE BUTTON's 'onclick' EVENT.
    button.setAttribute('onclick', 'GetTableValues()');

    // FINALLY ADD THE NEWLY CREATED TABLE AND BUTTON TO THE BODY.
    document.body.appendChild(table);
    document.body.appendChild(button);
    */
}

function GetTableValues() {

    var empTable = document.getElementById('empTable');

    // CREATE A DIV WHERE WE'LL SHOW THE TABLE WITH DATA.
    var div = document.createElement('div');
    div.innerHTML = "";
    div.innerHTML = '<br />';

    // TRAVERSE THROUGH THE TABLE TO XTRACT CELL VALUES.
    for (var r = 1; r <= empTable.rows.length - 1; r++) {        // EACH ROW IN THE TABLE.
        // EACH CELL IN A ROW.
        for (c = 0; c <= empTable.rows[r].cells.length - 1; c++) {      

            // ADD DATA TO THE DIV.
            div.innerHTML = div.innerHTML + ' ' +
                   empTable.rows[r].cells[c].innerHTML;

        }
        div.innerHTML = div.innerHTML + '<br />';
    }
    document.body.appendChild(div);     // APPEND (ADD) THE CONTAINER TO THE BODY.
}
