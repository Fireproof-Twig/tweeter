// Counter functionality

$(document).ready(function () {
  let maximumLength = 140;
  textArea = $("#tweet-text");
  textArea.on("input", function () {
    let remainingCharacter = maximumLength - $(this).val().length;
    const counter = $(this).parent().find(".counter");
    if (remainingCharacter >= 0) {
      $(".counter").removeClass("negative");
      counter.val(remainingCharacter);
    } else {
      $(".counter").addClass("negative");
      counter.val(remainingCharacter);
    }
  });
});
