$( document ).ready(function() {

    var storedSchedule = JSON.parse(localStorage.getItem("schedule"));
    var schedule = [];

    // Displays current date and time above the schedule
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));
    $("#currentTime").text(moment().format("hh:mm:ss a"));

    // Starts ticking the second clock
    function updateClock() {
        $("#currentTime").text(moment().format("hh:mm:ss a"));

        // Updates time block row color in realtime when the clock strikes a new hour
        if (parseInt(moment().format("s")) === 0 && parseInt(moment().format("m")) === 0) {
            setBGColor();
        }
    }
    setInterval(updateClock, 1000);

    // Color codes each time block from 9 to 17 (9am to 5pm)
    function setBGColor() {
        for (i = 9; i < 18; i++) {
            if (i < parseInt(moment().format("k"))) {
                $("#hour-" + [i]).removeClass("present");
                $("#hour-" + [i]).removeClass("future");
                $("#hour-" + [i]).addClass("past");
            } else if (i === parseInt(moment().format("k"))) {
                $("#hour-" + [i]).removeClass("future");
                $("#hour-" + [i]).removeClass("past");
                $("#hour-" + [i]).addClass("present");
            } else {
                $("#hour-" + [i]).removeClass("present");
                $("#hour-" + [i]).removeClass("past");
                $("#hour-" + [i]).addClass("future");
            }
        }
    }

    // Loads on page startup
    function init() {
        setBGColor();

        // Sets a blank schedule if no local schedule is found
        if (storedSchedule !== null) {
            schedule = storedSchedule;
        } else {
            schedule = [
                {
                    time: 9,
                    plan: "",
                },
                {
                    time: 10,
                    plan: "",
                },
                {
                    time: 11,
                    plan: "",
                },
                {
                    time: 12,
                    plan: "",
                },
                {
                    time: 13,
                    plan: "",
                },
                {
                    time: 14,
                    plan: "",
                },
                {
                    time: 15,
                    plan: "",
                },
                {
                    time: 16,
                    plan: "",
                },
                {
                    time: 17,
                    plan: "",
                }
            ];
        }

        // Fills each time block with events from the schedule
        for (i = 9; i < 18; i++) {
            $("#hour-" + [i]).find("textarea").val(schedule[i-9].plan);
        }
    }
    
    $(".saveBtn").on("click", function() {
        // Takes the text entered in the textarea and stores it in the schedule array
        schedule[$(this).parent().data("time")].plan = $(this).siblings("textarea").val()

        // Saves the event to localStorage
        localStorage.setItem("schedule", JSON.stringify(schedule));
    });

    init();

});


