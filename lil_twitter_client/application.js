$(document).ready(function(){
  var api_server = "http://localhost:3000"
  console.log(sessionStorage)
  isLoggedIn = function() {
    return (sessionStorage.current_user != null)
  }

  var getFeed = function(){
    $.ajax({
      url: api_server +"/feed",
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
    var payload = $("#loginForm").serialize();
    $.ajax({
      url: api_server +"/login",
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
    var payload = $("#newPostForm").serialize();

    $.ajax({
      url: api_server +"/users/"+sessionStorage.current_user+"/posts",
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
      url: api_server+url,
      dataType: "json",
      type: "delete"
    }).done(function(response){
      console.log("success deleting post");
      $("#post"+response.id).remove();
    })
  })

  $(".content").on('click', '#searchUsers', function(event){
    event.preventDefault();
    var url = "/users/search"
    var payload = $("#searchUsersForm").serialize();
    $.ajax({
      url: api_server+url,
      dataType: 'json',
      type: 'get',
      data: payload
    }).done(function(response){
      console.log("successfully #searchUsers");
      $.each(response, function(index, user) {
        var sourceHTML = $('#userSearchTemplate').html();
        var templater = Handlebars.compile(sourceHTML);
        var content = {data: user}
        $("#userSearchResults").append(templater(content));
      });
    }).fail(function(){
      console.log("unable to #searchUsers");
    });
  });

  $("#userSearchResults").on('click', '.follow-user', function(response){
    event.preventDefault();
    var url = $(this).attr("href");
    var that = this
    var payload = $(this).parent().parent().prev().serialize();


    $.ajax({
      url: api_server + url,
      data: payload,
      dataType: "json",
      type: "post"
    }).done(function(response){
      console.log("successfully followed a user")

      $(that).html("Followed!")
       // change button text to "followed!" and make not clickable
    })

  })

})
