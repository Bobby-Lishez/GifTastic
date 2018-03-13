//global variables
// Dom selectors
var $buttons = $("#buttons"),
    $addButton = $("#add-button"),
    $searchBar = $("#searchBar"),
    $gifDisplay = $("#gifDisplay");
//ajax variables
var baseURL = "https://api.giphy.com/v1/gifs/search?api_key=3zXNmF0QZ8TBmBqaPVcS1n71HcSUjkdz&limit=10&q=";
// 
var startingArray = ["Superman", "Wonder Woman", "Green Lantern", "The Flash", "Batman", "Aquaman", "Martian Manhunter"];
//function to capitalize the first letter of each word
function jadenCase(string) {
    return string.replace(/\b./g , function(a) {return a.toUpperCase();});
}
//function to create a new button
function addButton(searchString) {
    searchString = jadenCase(searchString);
    $buttons.append("<button class = gifButton id = '" + searchString + "'>" + searchString + "</button>");
}
$addButton.click(function(event) {
    event.preventDefault();
    addButton($searchBar.val().trim());
    $searchBar.val("");
})
$(document).on("click", ".gifButton", function(event){
    event.preventDefault();
    $.ajax({
        url: baseURL + event.currentTarget.id,
        method: 'GET'        
    }).then(function(response){
        console.log(response);
        for (var i = 0; i< 10; i++) {
            var newGif = $(" <img class = gif data-state = still src = " + response.data[i].images.fixed_width_still.url + "><figcaption class='figure-caption'>Rating: "+ response.data[i].rating +"</figcaption> ");
            newGif.attr("data-still", response.data[i].images.fixed_width_still.url);
            newGif.attr("data-animate", response.data[i].images.fixed_width.url);
            $gifDisplay.append(newGif);
        // $gifDisplay.append("<img src = " + response.data[i].images.fixed_height_still.url + 
        //                      "data-still = " + response.data[i].images.fixed_height_still.url +  
        //                      "data-animate = " + response.data[i].images.fixed_height.url + 
        //                      "data-state = still class = gif><hr>");
        }
    })
});
$(document).on("click", ".gif", function(event){
    event.preventDefault();
    var state = $(this).data("state");
        console.log(state);
        if (state === "still"){
        // then update the src attribute of this image to it's data-animate value,
        this.src = $(this).attr("data-animate");
        // and update the data-state attribute to 'animate'.
        state = "animate";
        $(this).data("state", state);
        }
        // If state is equal to 'animate', then update the src attribute of this
        else {
        // image to it's data-still value and update the data-state attribute to 'still'
        this.src = $(this).attr("data-still");
        state = "still";
        $(this).data("state", state);
        }
})
//function call to load our buttons at page load
startingArray.map(addButton);