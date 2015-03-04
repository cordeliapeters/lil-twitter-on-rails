$(document).ready(function(){
  console.log(sessionStorage)
  isLoggedIn = function() {
    return (sessionStorage.current_user != null)
  }

  var getFeed = function(){
    $.ajax({
      url: "http://localhost:3000/feed",
      type: 'get',
      dataType: 'json',
      data: {user_id: sessionStorage.current_user}
    }).done(function(response){
      console.log("success getting feed");
      var newPostTemplate = $('#newPostTemplate').html();
      var handlebars = Handlebars.compile(newPostTemplate);
      $("#feed").append(handlebars);


      $.each(response, function(index, post) {
        var sourceHTML = $('#postTemplate').html();
        var templater = Handlebars.compile(sourceHTML);
        var content = {data: post}
        $("#feed").append(templater(content));
      });
    }).fail(function(){
      console.log("error getting feed");
    })
  };
  // case for user alreagy logged in
  if ( isLoggedIn() ){
    $("#sessionForm").slideUp();
    getFeed();
  };

  console.log(isLoggedIn());
  $("#login").on('click', function(event){
    event.preventDefault();
    payload = $("#loginForm").serialize();
    $.ajax({
      url: "http://localhost:3000/login",
      type: "post",
      dataType: "json",
      data: payload
    }).done(function(response){
      console.log("success at login")
      sessionStorage.current_user = response.id;
      sessionStorage.current_user_handle = response.handle;
      $("#sessionForm").slideToggle();
      getFeed();
    })
  });


  $(".content").on('click', "#sharePost", function(event){
    event.preventDefault();
    payload = $("#newPostForm").serialize();

    $.ajax({
      url: "http://localhost:3000/users/"+sessionStorage.current_user+"/posts",
      type: 'post',
      dataType: 'json',
      data: payload
    }).done(function(response){
      console.log("success creating post");
      var sourceHTML = $('#postTemplate').html();
      var templater = Handlebars.compile(sourceHTML);
      var content = {data: response}
      $("#feed").append(templater(content));
    }).fail(function(){
      console.log("error making post");
    })
  })


  $(".content").on('click', "#deletePost", function(event){
    event.preventDefault();
    var url = $(this).attr("href")

    $.ajax({
      url: "http://localhost:3000"+url,
      dataType: "json",
      type: "delete"
    }).done(function(response){
      console.log("success deleting post");
      $("#post"+response.id).remove();
    })
  })

//   e.preventDefault;
//   var url = $(this).attr("href")

//   $.ajax({
//     url: url,
//     dataType: "json",
//     type: "get"
//   }).done(function(response){
//     // append the form to make a new post
//   }).fail(function(){
//     alert("you failed");
//   })
// })





})
