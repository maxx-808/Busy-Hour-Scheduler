$(document).ready(function () {
    //variables to display current day
    const currentDay = moment().format('MMMM Do, YYYY');

    //variables to write the time blocks 9-5
    const businessHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

    //setting the current time to the header
    $("#currentDay").append(currentDay);

    //for loop to make the hours row in the columns
    for (let i = 0; i < businessHours.length; i++) {
        //logs current hour in military as a constant to use as reference
        const currentHour = moment().format('H');

        let row = $("<div class='row'>");
        let form = $("<form autocomplete='off'>")
        let column1 = $("<div class='input-group-prepend hour'>");
        let column2 = $("<input class='form-control input'>");
        let column3 = $("<button class='input-group-append saveBtn' type='submit'>");

        let valueFromLocal = localStorage.getItem(businessHours[i]);
        column2.attr("value", valueFromLocal);

        column1.attr("id", "time" + businessHours[i]);
        column2.attr("id", businessHours[i]);
        column3.attr("id", "button" + businessHours[i]);

        const hours = $("<h3>");
        hours.text(businessHours[i] + "am");

        const saveHour = $("<h6>");
        saveHour.text("Save event");

        //setting all the time slots 
        if (businessHours[i] >= 12) {
            hours.text(businessHours[i] + "pm");
            if (businessHours[i] >= 13) {
                hours.text(businessHours[i] - 12 + "pm");
            };
        };
        
        column1.append(hours);
        column3.append(saveHour);
        form.append(column1, column2, column3);
        row.append(form);
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