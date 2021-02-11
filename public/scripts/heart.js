//Potential heart feature below
$(document).ready(function(){
  $("#favourite-button").on('submit'), function(event) {
   let favouriteButton = $('#favourite-button');
   if (event) {
     favouriteButton.css('color', 'red');
   } else {

   }
  }
});




$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    let charactersLeft = 140 - this.value.length;
    let charCounter = $('#char-counter');
    charCounter.text(charactersLeft);
    if(charactersLeft < 0) {
      charCounter.css('color', 'red');
    } else {
      charCounter.css('color', '#545149');
    }
  })
});


$("form").on("submit", function (event) {
  event.preventDefault();
  let textArea = $('#tweet-text');
  let validatedText = textArea.val();
  if(validatedText.length === 0) {
    alert("Please write something");
  } else if(validatedText.length > 140) {
    alert("Your tweet exceeds the character limit");
  } else {
    $.ajax('/tweets', {method: 'POST', data: {text: validatedText}})
    .then(function(result) {
      loadTweets();
      textArea.val(""); //Clears text box after new tweet is posted
    })
  }
})
})


<form action="/api/users/<%= book.id %>/favourite" method="POST">
<li id="favourite-button" class="list-group-item"><button type="submit">Favourite</button> <i class="fas fa-heart"></i></li>
</form>
