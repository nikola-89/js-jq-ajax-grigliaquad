$(document).ready(function() {
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
    var color = "cell__green";
    var templateMessage = Handlebars.compile($('#cell').html());
    if (number <= 5) {
        color = "cell__yellow";
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
        "class": 'cell__red'
    }
    $(templateMessage(message)).insertAfter(element);
    element.remove();
}
