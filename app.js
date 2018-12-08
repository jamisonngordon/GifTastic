var terms = ['wow', 'hurray', 'jeepers', 'nice', 'nope', 'very cool', 'no', 'yes', 'absolutely not', 'thumbs up'];
var buttons = [];
var giphUrls = [];
var images = [];

$(document).ready(function () {

    for (var x = 0; x < terms.length; x++) {

        addTermButton(terms[x]);
    }

});

function handleClick(event) {

    $("#gifs").hide();

    var term = $(event.target).text().trim();
    term = term.split(' ').join('+');

    var xhr = $.get("https://api.giphy.com/v1/gifs/search?q=" + term +"&api_key=yd4KYUEGPHRoYxmWoHg6Qfeqng6mS1WH&limit=10");
    xhr.done(function(data) {  fillGifs(data); });
}

function addTermButton(text) {

    var button = $(
        "<div class='mr-2'>" +
            "<button type='button' class='btn btn-outline-info'>" + text + "</button>" +
        "</div>");

    buttons.push(button);

    $("#buttons").append(button);

    $(button).click( function (event) {
        handleClick(event);
    });

}

function addSearchTerm() {

    var term = $("#searchInput").val();

    $("#searchInput").val('');

    addTermButton(term);

}

function fillGifs(data) {

    data = data.data;
    giphUrls = [];
    $("#gifs").html('');

    for(var x = 0; x < data.length; x++) {

        giph = {
            still: data[x].images.fixed_width_still.url,
            gif: data[x].images.fixed_width.url
        };

        giphUrls.push(giph);

        var currentImage = "<img src='" +giph.still + "' id='image-" + x +"' class='image'></img";
        var currentRating = "<h3 class='my-font text-center'>Rating: " + data[x].rating + "</h3>"
        images.push(currentImage);

        var imageWithBorder =
        $("<div class='col-3 col-centered mt-4'>"+
            "<div class='my-border'>" +
                currentImage +
                "<div>" +
                    currentRating +
                "</div>" +
            "</div>" +
        "</div"
        );

        $("#gifs").append(imageWithBorder);

        $("#image-" + x).click(function (event) {
            swapImages(event);
        });

    }

    $("#gifs").show();
}

function swapImages (event) {

    var image = $(event.target);

    var y = image.prop('id').replace('image-', '');
    var currentUrls = giphUrls[y];

    if(image.prop("src") === currentUrls.still) {

        $(image).prop("src", currentUrls.gif);

    } 
    else if (image.prop("src") === currentUrls.gif) {

        $(image).prop("src", currentUrls.still);

    }
}