// Array to store events added to the page
var storageArray = ["","","","","","","","",""];

// Check if there are events stored locally
if(localStorage.getItem("storageArray") != null){
    storageArray = JSON.parse(localStorage.getItem("storageArray"));
}

// Called to update the timeblock colors based the current time as well as update the timeblock textareas to match what is saved in local storage.
function displayPlanner(){
    var planner = $("#planner");
    var currentHour = moment().format('h a');

    //Loops through each entry in localstorage that corresponds to a timeblock
    $(storageArray).each(function(index){
        //Get the timeblock associated with the index in storage
        var currentZone = $(planner.children().eq(index).children(".description"));

        //Get the hour of the timeblock
        var zoneTime = planner.children().eq(index).children().first().children().text();

        //Update the content of the timeblock to what is stored
        currentZone.val(this);

        //Update the color of the timeblock relative to the current hour
        var currentArray = currentHour.split(" ");
        var zoneArray = zoneTime.split(" ");
        if(currentArray[1] == zoneArray[1]){
            if(Number(currentArray[0])%12 > Number(zoneArray[0])%12){
                currentZone.addClass("past");
            }else if(currentArray[0] == zoneArray[0]){
                currentZone.addClass("present");
            }else if(Number(currentArray[0])%12 < Number(zoneArray[0])%12){
                currentZone.addClass("future");
            }
            
        }else if(currentArray[1] == "pm"){
            currentZone.addClass("past");
        }else{
            currentZone.addClass("future");
        }
    })
}

// Event delegation to store the content of the corresponding timeblock to local storage when a button is pressed
function updateStorage(event){
    var target = $(event.target)
    if(target.is("button") || target.is("i")){
        var blockIndex = target.closest(".time-block").attr("id").substr(-1);
        storageArray[blockIndex] = target.closest(".time-block").children(".description").val();
        localStorage.setItem("storageArray", JSON.stringify(storageArray));
    }
}

$("#planner").on("click", updateStorage);

//Update the label of the current day every half-second interval
function setTime(){
    $("#currentDay").text(moment().format('dddd, MMMM Do'));
}
setInterval(setTime,500);

displayPlanner();