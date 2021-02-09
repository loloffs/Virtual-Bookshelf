// Do we need document.ready?

// $(document).ready(function () {

// });



$(() => {
console.log("TEST");
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;
  $("#login-button").click(() => {
    console.log("log and click");
     $.ajax({
    method: "POST",
    url: "/login"
  }).done(() => {
    console.log("login complete");
  });;
  });
});
