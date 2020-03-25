/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  const createTweetElement = (post) => {
    let $article = $('<article>').addClass('tweet-container');
    let $header = $('<header>').addClass('space-between');
    let $headerLeft = $('<div>').text(post.user.name);
    let $headerRight = $('<div>').addClass("handle").text(post.user.handle);
    let $content = $('<p>').text(post.content.text);
    let $footer = $('<footer>').addClass('space-between');
    let $footerLeft = $('<div>').text(post.created_at);
    $header.append($headerLeft);
    $header.append($headerRight);
    $article.append($header);
    $article.append($content);
    $footer.append($footerLeft);
    $article.append($footer);
    return $article;
  }
  const $form = $('form');
  $form.on('submit', (event) => {
    event.preventDefault();
    const formData = $form.serialize();
  })
  const tweets = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      $('#tweets').append(createTweetElement(tweet));
    }
  }
  renderTweets(tweets);
});
