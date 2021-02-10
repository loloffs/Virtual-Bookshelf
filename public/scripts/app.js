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

  $('#favourite').click(() => {
    this.show();
  });


  $("#login-button").click(() => {
    console.log("login click");
     $.ajax({
    method: "POST",
    url: "/api/users/login"
  }).done(() => {
    console.log("login complete");
  });;
  });

  $("#logout-button").click(() => {
    console.log("logout click");
     $.ajax({
    method: "POST",
    url: "/api/users/logout"
  }).done(() => {
    console.log("logged out");
  });;
  });







});
