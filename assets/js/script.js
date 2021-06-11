var storageArray = ["","","","","","","","",""];

if(localStorage.getItem("storageArray") != null){
    storageArray = JSON.parse(localStorage.getItem("storageArray"));
}

function displayPlanner(){
    var planner = $("#planner");
    var currentHour = moment().format('h a');
    console.log(currentHour);
    $(storageArray).each(function(index){
        var currentZone = $(planner.children().eq(index).children(".description"));
        var zoneTime = planner.children().eq(index).children().first().children().text();
        console.log(zoneTime);
        currentZone.val(this);
        var currentArray = currentHour.split(" ");
        var zoneArray = zoneTime.split(" ");
        
        console.log(currentArray);
        console.log(zoneArray);

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

function updateStorage(event){
    var target = $(event.target)
    if(target.is("button") || target.attr("class") == "i"){
        var blockIndex = target.closest(".time-block").attr("id").substr(-1);
        storageArray[blockIndex] = target.closest(".time-block").children(".description").val();
        localStorage.setItem("storageArray", JSON.stringify(storageArray));
    }
}

$("#planner").on("click", updateStorage);

function setTime(){
    $("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ss a'));
}

setInterval(setTime,500);

displayPlanner();

console.log(12%12);