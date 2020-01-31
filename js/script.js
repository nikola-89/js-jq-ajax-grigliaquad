$(document).ready(function() {
    builder = Handlebars.compile($('#builder').html());
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
                    error(element, s);
                }
            },
            error: function (r, s) {
                error(element, s);
            }
        }
    );
}

function print(number, element) {
    var color = "cell cell__green";
    if (number <= 5) {
        color = "cell cell__yellow";
    }
    var cell_config = {
        "number": number,
        "class": color
    }
    $(builder(cell_config)).insertAfter(element);
    element.remove();
}

function error(element, status) {
    var cell_config = {
        "number": status,
        "class": 'cell cell__red'
    }
    $(builder(cell_config)).insertAfter(element);
    element.remove();
}

function gridPrinter(x, y) {
    // row
    var row_x_config = {
        "class": 'row'
    }
    // cell
    var cell_y_config = {
        "number": 'Click Me!',
        "class": 'cell'
    }
    for (var i = 0; i <= x - 1; i++) {
        $(builder(row_x_config)).appendTo($('.main-wrapper'));
        console.log('Generating... |ROW|');
        for (var z = 0; z <= y - 1; z++) {
            $(builder(cell_y_config)).appendTo($('.row')[i]);
            console.log('Generating... [CELL]');
        }
    }
}
