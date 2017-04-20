var numberOfHoles = 18;
var myPlace = {latitude: 40.50, longitude: -111.75, radius: 100};
var closeCourses;
var selectedCourse;
var players;
var par;
var HDC;

$(document).ready(function(){
    $.post("https://golf-courses-api.herokuapp.com/courses", myPlace, function(data, status){
        closeCourses = JSON.parse(data);
        for(var p in closeCourses.courses){
            var selectLocation = "<option value='"+ closeCourses.courses[p].id +"' on-click='loadCourse(" + closeCourses.courses[p].id + ")'>"+ closeCourses.courses[p].name + "</option>";
            $("#courseSelect").append(selectLocation);
        }
    });
});

function loadCourse(theid){
    $("#teeTypes").html("");
    $.get("https://golf-courses-api.herokuapp.com/courses/" + theid, function(data, status){
        selectedCourse = JSON.parse(data);
        numberofHoles = selectedCourse.course;
        $("#courseTitle").html(selectedCourse.course.name);
        for(var i = 0; i < (selectedCourse.course.tee_types.length); i++){
            $("#teeTypes").append("<option value='" + i + "'>" + selectedCourse.course.tee_types[i].tee_type + "</option>");
        }
    });
}

function beginCard() {
    var totalboxes = "";
    players = $("#playerCount").val();
    $("#leftCard").html('');
    for (var i = 0; i < players; i++) {
        $("#leftCard").append(" <div id='playerLabel" + (i + 1) + "'> Player " + (i + 1) + " " +
            "<span class='removebtn glyphicon glyphicon-minus-sign' onclick='removePlayer("+ i +")'></span></div>");
        totalboxes += "<div id='playertotal" + (i + 1) +"'></div>";

    }
    // for(var c = 1; c >= numberOfHoles; c++){
    //     $("#rightCard").append("<div id='columm'" + c + " class='holcol'><div class='colHeader'> " + c + "</div> </div>");
    // }

    for(var c = 1; c <= numberOfHoles; c++){
        $("#rightCard").append("<div id='column" + c + "' class='holcol'><div class='colheader'>" + c + " </div>");
    }

    $("#rightCard").append("<div class='holcol'><div class='colheader'>Total</div> "+ totalboxes + " </div>");
    buildHoles();
}

function buildHoles (){
    for(var p = 1; p <= players; p++){
        for (var h = 1; h <= numberOfHoles; h++){
            if(h == 1){
                $("#column" + h).append('<div id="parColumn"' + h + ' class="holcol"><div>' +
                    ' + selectedCourse.course.holes[0].tee_boxes[i].par + </div>')
            }
        }
    }
}

function removePlayer(theId) {
    $("#playerLabel" + theId).remove();
    for (var i = 1; i <= numberOfHoles; i++){
        $("#player" + theid + "hole" + i).remove();
    }
}

function calculatescore(playerid){
    var thetotal = 0;
    for (var t = 1; t <= numberOfHoles; t++){
        thetotal += Number($("#player" + playerid + "hole" + t).val());
    }
    $("#playertotal" + playerid).html(thetotal);
}