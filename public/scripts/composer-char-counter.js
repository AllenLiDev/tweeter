$(document).ready(function () {
  $("#tweet-text").on('keyup', function () {
    const element = $(this.parentNode.lastElementChild);
    let count = (140 - $(this).val().length);
    element.val(count);
    if (count < 140) {
      element.css("color", "red");
    } else {
      element.css("color", "black");
    }
  });
});
