
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
    console.log("login click");
     $.ajax({
    method: "POST",
    url: "/api/users/login"
  }).done(() => {
    console.log("login complete");
  });;
  });

  // $("#logout-button").click(() => {
  //   console.log("logout click");
  //    $.ajax({
  //   method: "POST",
  //   url: "/api/users/logout"
  // }).done(() => {
  //   console.log("logged out");
  // });;
  // });

  $("#favourite-button").click(() => {
    console.log("favourite click");
     $.ajax({
    method: "POST",
    url: "/api/users/favourite"
  }).done(() => {
    console.log("listing favourited!");
  });;
  });
  // $(".button-sold").click(() => {
  //   $().toggle();
  // });
});



