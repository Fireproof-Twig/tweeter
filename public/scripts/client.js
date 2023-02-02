$(document).ready(function () {
  ///////////// error handling
  $(".error-long").hide();
  $(".error-nothing").hide();
  $(".error-long").slideUp();
  $(".error-nothing").slideUp();
  //////////////Function declarations
  // returns info from text area to database
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
  // adds tweet to top of tweets container
  const renderTweets = function (tweets) {
    for (tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  };
  // retrieves tweets from database
  const loadtweets = function () {
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "GET",
      success: function (data) {
        renderTweets(data);
      },
    });
  };
  /////////Function calls and error handling
  loadtweets();

  $(".new-tweet-form").submit(function (event) {
    event.preventDefault();
    const postUrl = "/tweets";
    const method = "POST";
    const data = $(this).serialize();
    // error handling
    if ($("#positiveCounter").val() === "140") {
      return $(".error-nothing").slideDown();
    } else if ($("#positiveCounter").val() <= 0) {
      return $(".error-long").slideDown();
    } else {
      $(".error-long").slideUp();
      $(".error-nothing").slideUp();
    }
    //error handling end
    $.ajax({
      url: postUrl,
      method,
      data,
      success: function () {
        $("#tweets-container").empty();
        $(".counter").val("140");
        loadtweets();
        $("#tweet-text").val("");
      },
    });
  });
});
