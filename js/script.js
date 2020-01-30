$(document).ready(function() {
    gridPrinter(6, 6);
    $(document).on('mouseenter mouseleave click', '.cell', function(event) {
        if (event.type == "mouseenter") {
            $(this).addClass('cell__hover');
        } else if (event.type == "mouseleave") {
            $(this).removeClass('cell__hover');
        } else {
            request($(this));
        }
    });
});

// ***************************
// **********function*********
// ***************************

function request(element) {
    $.ajax(
        {
            url: "https://flynn.boolean.careers/exercises/api/random/int",
            method: "GET",
            success: function (r, s) {
                if (!isNaN(r.response)) {
                    print(r.response, element);
                } else {
                    error(element);
                }
            },
            error: function (r, s, e) {
                error(element);
            }
        }
    );
}

function print(number, element) {
    var color = "cell cell__green";
    var templateMessage = Handlebars.compile($('#cell').html());
    if (number <= 5) {
        color = "cell cell__yellow";
    }
    var message = {
        "number": number,
        "class": color
    }
    $(templateMessage(message)).insertAfter(element);
    element.remove();
}

function error(element) {
    var templateMessage = Handlebars.compile($('#cell').html());
    var message = {
        "number": 'Ops!',
        "class": 'cell cell__red'
    }
    $(templateMessage(message)).insertAfter(element);
    element.remove();
}

function gridPrinter(x, y) {
    // row
    var row_x = Handlebars.compile($('#row').html());
    var row_x_config = {
        "class": 'row'
    }
    // cell
    var cell_y = Handlebars.compile($('#cell').html());
    var cell_y_config = {
        "number": 'Click Me!',
        "class": 'cell'
    }
    for (var i = 0; i <= x - 1; i++) {
        $(row_x(row_x_config)).appendTo($('.main-wrapper'));
        console.log('Generating... ROW');
        for (var z = 0; z <= y - 1; z++) {
            $(cell_y(cell_y_config)).appendTo($('.row')[i]);
            console.log('Generating... CELL');
        }
    }
}
