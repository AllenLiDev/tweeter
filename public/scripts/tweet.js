$(() => {
  $(".show-form").click((e) => {
    e.preventDefault();
    $(".new-tweet").show();
  })
  $(".tweet-container").hover(
    function () {
      const element = $(this);
      element.css({
        "filter": "none",
        "box-shadow": "5px 5px 3px 3px #ccc"
      });
      element.children("header").children(".handle").css("visibility", "visible");
    },
    function () {
      const element = $(this);
      element.css({
        "filter": "blur(0.5px)",
        "box-shadow": "none"
      });
      element.children("header").children(".handle").css("visibility", "hidden");
    });
});
