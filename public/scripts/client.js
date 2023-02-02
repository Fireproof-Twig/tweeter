/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // const data = [
  //   {
  //     user: {
  //       name: "Newton",
  //       avatars: "https://i.imgur.com/73hZDYK.png",
  //       handle: "@SirIsaac",
  //     },
  //     content: {
  //       text: "If I have seen further it is by standing on the shoulders of giants",
  //     },
  //     created_at: 1461116232227,
  //   },
  //   {
  //     user: {
  //       name: "Descartes",
  //       avatars: "https://i.imgur.com/nlhLi3I.png",
  //       handle: "@rd",
  //     },
  //     content: {
  //       text: "Je pense , donc je suis",
  //     },
  //     created_at: 1461113959088,
  //   },
  // ];
  $(".error-long").hide();
  $(".error-nothing").hide();
  $(".error-long").slideUp();
  $(".error-nothing").slideUp();
  const createTweetElement = function (tweet) {
    let user = tweet.user;
    let content = tweet.content.text;
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    const safeHTML = `<p>${escape(content)}</p>`;

    let createdAt = tweet.created_at;
    createdAt = timeago.format(createdAt);
    // if (content.text.length > 140) {
    //   return alert("message too long");
    // }
    // if (!content.text) {
    //   return alert("No message");
    // }
    let $tweet = $(`<article class="tweet">
    <header>
      <img src="${user.avatars}"/>
      <span>${user.name}</span>
      <span class="handle">${user.handle}</span>
    </header>
    <span class="content">${safeHTML}</span>
    <div class="line"></div>
    <footer>
      <span>${createdAt}</span>
      <span>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </span>
    </footer>
  </article>`);
    return $tweet;
  };

  const renderTweets = function (tweets) {
    // loops through tweets
    for (tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  };

  const loadtweets = function () {
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "GET",
      success: function (data) {
        // console.log(data);
        renderTweets(data);
      },
    });
  };

  loadtweets();

  // // Test / driver code (temporary). Eventually will get this from the server.
  // const tweetData = {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": "https://i.imgur.com/73hZDYK.png",
  //       "handle": "@SirIsaac"
  //     },
  //   "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //   "created_at": 1461116232227
  // }

  // const $tweet = createTweetElement(tweetData);

  // // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

  // renderTweets(data);

  // $(".new-tweet-form").on("submit", (evt) => {
  //   evt.preventDefault();
  //   const tweetData = $("#tweet-text").val();
  //   console.log("my Tweet", tweetData);
  //   console.log(this);
  //   $.ajax({
  //     url: "/tweets",
  //     method: "POST",
  //     data: tweetData,
  //   }).done(function () {
  //     console.log("ajax posted succefuly");
  //   });
  // });

  $(".new-tweet-form").submit(function (event) {
    event.preventDefault();
    const postUrl = "/tweets";
    const method = "POST";
    const data = $(this).serialize();
    if ($("#positiveCounter").val() === "140") {
      return $(".error-nothing").slideDown();
    } else if ($("#positiveCounter").val() <= 0) {
      return $(".error-long").slideDown();
    } else {
      $(".error-long").slideUp();
      $(".error-nothing").slideUp();
    }
    $.ajax({
      url: postUrl,
      method,
      data,
      success: function () {
        $("#tweets-container").empty();
        loadtweets();
        $("#tweet-text").val("");
      },
    }).done(function () {
      console.log("done");
    });
  });
});

// $("form").on("submit", (evt) => {
//   evt.preventDefault();
// });
