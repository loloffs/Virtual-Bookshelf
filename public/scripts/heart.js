//Potential heart feature below
$(document).ready(function(){
  $("#favourite-button").on('click'), function(event) {
    let heartIcon = $(event.target).find('.fas-fa-heart')
     heartIcon.toggleClass('activeHeartIcon');
   }
});







