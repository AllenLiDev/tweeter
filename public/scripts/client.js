/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  const createTweetElement = (post) => {
    let $article = $('<article>').addClass('tweet-container');
    let $header = $('<header>').addClass('space-between');
    let $avatar = $('<img>', { 'src': post.user.avatars });
    let $headerLeft = $('<div>')
    let $headerLeftInner = $('<span>').text(post.user.name);
    let $headerRight = $('<div>').addClass("handle").text(post.user.handle);
    let $content = $('<p>').text(post.content.text);
    let $footer = $('<footer>').addClass('space-between');
    let $footerLeft = $('<div>').text(getDate(post.created_at));
    $headerLeft.append($avatar);
    $headerLeft.append($headerLeftInner);
    $header.append($headerLeft);
    $header.append($headerRight);
    $article.append($header);
    $article.append($content);
    $footer.append($footerLeft);
    $article.append($footer);
    return $article;
  };

  const getDate = (num) => {
    const now = new Date().getTime();
    let days = 0;
    days = Math.round((now - num) / (1000 * 60 * 60 * 24))
    if (days === 0) {
      return Math.round((now - num) / (1000 * 60 * 60)) + " hours ago";
    }
    return days + " days ago";
  }

  const loadTweets = () => {
    $.get("/tweets", function (data) {
      renderTweets(data);
    });
  };

  const $form = $('form');
  $form.on('submit', (event) => {
    event.preventDefault();
    const formData = $form.serialize();
    if (validateForm(formData)) {
      $.post('/tweets', formData)
        .then((res) => {
          loadTweets();
        });
    }
  });

  const validateForm = (formData) => {
    let cleanData = formData.substring(5);
    const errorContainer = $(".error-message");
    if (cleanData.length === 0) {
      errorContainer.text("🚨 Please Enter A Message to Tweet 🚨")
      errorContainer.slideDown("slow", () => {
        setTimeout(() => {
          errorContainer.slideUp("slow");
        }, 3000);
      });
      return false;
    } else if (cleanData.length > 140) {
      errorContainer.text("🚨 Please Enter A Message Shorter than 140 Characters 🚨")
      errorContainer.slideDown("slow", () => {
        setTimeout(() => {
          errorContainer.slideUp("slow");
        }, 3000);
      });
      return false;
    } else {
      return true;
    }
  }

  const renderTweets = function (tweets) {
    $('#tweets').empty();
    for (const tweet of tweets) {
      console.log(tweet)
      $('#tweets').prepend(createTweetElement(tweet));
    }
    $.getScript('/scripts/tweet.js');
  }

  loadTweets();
});
