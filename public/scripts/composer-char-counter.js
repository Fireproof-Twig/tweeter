


$(document).ready(function() {
  // const textArea = document.getElementById("tweet-text")
  // const printMessage = () => {
  //   console.log("experimented with text area")
  // }

  // document.addEventListener("click", () => {
  //   alert("You clicked somewhere on tweeter");
  // });
  // console.log("bonjour")
  let maximumLength = 140;
  textArea = $('#tweet-text');
  textArea.on('input', function() {
    let remainingCharacter = maximumLength - $(this).val().length;
    const counter = $(this).parent().find('.counter');
    if (remainingCharacter >= 0) {
      // $('.counter').removeClass("negative")
      counter.val(remainingCharacter);
    }
    else {
      $('.counter').addClass("negative")
      counter.val(remainingCharacter);
    }
 
  
  })

  // textArea.addEventListener('click', () => {
  //   alert("hello there")
  // });
});