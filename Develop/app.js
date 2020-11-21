$(document).ready(function () {
    //variables to display current day
    var currentDay = moment().format('MMMM Do, YYYY');

    //variables to write the time blocks 9-5
    var businessHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

    //setting the current time to the header
    $("#currentDay").append(currentDay);

    //for loop to make the hours row in the columns
    for (let i = 0; i < businessHours.length; i++) {
        //logs current hour in military as a constant to use as reference
        const currentHour = moment().format('H');

        //variables for the rows, forms and columns
        var row = $("<div class='row'>");
        var form = $("<form autocomplete='off'>")
        var column1 = $("<div class='input-group-prepend hour'>");
        var column2 = $("<input class='form-control input'>");
        var column3 = $("<button class='input-group-append saveBtn' type='submit'>");

        //pulling local storage back to value of input
        var valueFromLocal = localStorage.getItem(businessHours[i]);
        column2.attr("value", valueFromLocal);

        //adding time number to id of all columns
        column1.attr("id", "time" + businessHours[i]);
        column2.attr("id", businessHours[i]);
        column3.attr("id", "button" + businessHours[i]);

        //variable for hours as text
        var hours = $("<h3>");
        hours.text(businessHours[i] + "am");

        //variable for hours for save button
        var saveHour = $("<h6>");
        saveHour.text("Save event");

        //if statement to have am set for all am hours and pm for all pm hours
        if (businessHours[i] >= 12) {
            hours.text(businessHours[i] + "pm");
            if (businessHours[i] >= 13) {
                hours.text(businessHours[i] - 12 + "pm");
            };
        };
        
        //pushing hours variable into columns
        column1.append(hours);

        // column2.append(inputEl);
        column3.append(saveHour);

        //columns into forms then into row
        form.append(column1, column2, column3);
        row.append(form);

        //pushing rows to calender div
        $("#calender").append(row);

        //color coding time frames
        if ((businessHours[i]) === parseInt(currentHour)) {
            column1.attr("class", "input-group-prepend hour present");
            column3.attr("class", "input-group-append saveBtn present");
        } else if ((businessHours[i]) <= parseInt(currentHour)) {
            column1.attr("class", "input-group-prepend hour past");
            column3.attr("class", "input-group-append saveBtn past");
        } else if ((businessHours[i]) >= parseInt(currentHour)) {
            column1.attr("class", "input-group-prepend hour future");
            column3.attr("class", "input-group-append saveBtn future");
        };
    };
    
    //sending info to local storage on submit from each form
    $("form").on("submit", function(e) {
        e.preventDefault();
        
        const time = e.target.querySelector("input").getAttribute("id");
        const text = e.target.querySelector("input").value;
        window.localStorage.setItem(time, text);
        
    });
});