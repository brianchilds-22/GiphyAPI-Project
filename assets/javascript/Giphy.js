$(function(){
  generateButtons(topics,"searchButton","#buttonArea"); // adds buttons to page
  console.log("Page Loaded");
})

// create an array named topics with strings
var topics =["Captain America","Thor", "Iron Man","Hulk","Groot"];
// use topics array to generate button function loop inside 
function generateButtons(topics,classToAdd,areaToAddTo) {
    $(areaToAddTo).empty(); // so no button copies are made
    for(var i = 0; i < topics.length; i++) { 
    var button = $("<button>"); // modifing button element
    button.addClass(classToAdd); //
    button.attr("data-type",topics[i]), // adding a type of data equal to string
    button.text(topics[i]); // text of button
    $(areaToAddTo).append(button); //
    }
}    

    $(document).on("click",".searchButton", function(){ 
      $('#searches').empty(); // clears gifs adds new
      var type =$(this).data("type"); // click button to store data
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +type+ "&api_key=8Ykbk0xjP3DLoOmjiO3XiGKYxMbn3q82&limit=10";
      $.ajax({url:queryURL,method:"GET"}) // call to API
        .done(function(response){ // response from API via object
          for(var i=0;i<response.data.length;i++){ // loop through response
            var searchDiv = $('<div class="search-item">'); // div for search area
            var rating = response.data[i].rating; // storing gif rating for current gif
            var p = $('<p>').text('Rating: '+rating); // p with rating text + the rating
            var animated = response.data[i].images.fixed_height.url; // animted version of gif
            var still = response.data[i].images.fixed_height_still.url; // still version of gif
            var image = $('<img>'); // ref to image tag
            image.attr('src',still); // modify image (still)
            image.attr('data-still',still); // modify ??
            image.attr('data-animated',animated); // store source link
            image.addClass('searchImage'); // add searchImage class
            searchDiv.append(p); // add p telling gif rating
            searchDiv.append(image); // adding image for gif
            $('#searches').append(searchDiv); // adding searhDiv into searches
        }
      })
})
// makes the gif animate and stop
$(document).on('click','.searchImage',function(){
  var state = $(this).attr('data-state');
  if (state === 'still'){ //click on still (start)
    $(this).attr('src',$(this).data('animated'));
    $(this).attr('data-state','animated'); // animates the gif
  } else {
    $(this).attr('src',$(this).data('still')); // stops the gif
    $(this).attr('data-state','still');
  }
})
// adds searched term to topics array and adds button
$('#addSearch').on('click',function() {
  var newSearch = $('input').eq(0).val();
  topics.push(newSearch);
  generateButtons(topics,'searchButton','#buttonArea');
  $('#search-input').val("");
  return false; // prevents page from reloading and erasing button
})




