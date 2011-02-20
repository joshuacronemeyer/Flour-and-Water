function setStarterHydration(){
  var percentWidth = parseInt(($('#hydration').width() / $('#starter').width())*100)
  $('#hydration').find('.quality').text(percentWidth);
  calculator.resetHydration();
}

baseTwitterIframeSRC = "http://platform0.twitter.com/widgets/tweet_button.html?_=1298156795174&count=vertical&lang=en&url=http%3A%2F%2Fjoshuacronemeyer.github.com%2FFlour-and-Water%2F&via=MakingLoaf"
function setTweetText(){
  var hydration = $("#result").text();
  var tweetText = "My sourdough is " + hydration + "% hydration exactly! I calculated it.";
  var encodedTweetText = "&text=" + encodeURIComponent(tweetText);
  $("iframe").attr("src", baseTwitterIframeSRC + encodedTweetText);
}

function updateHydration() {
   $(this).find('.quantity').text($(this).width());
    calculator.resetHydration();
}

function updateStarterAndHydration() { 
  $(this).find('.quantity').text($(this).width());
  setStarterHydration();
  calculator.resetHydration();
}

function resizeableParams(updateCallback){ 
  return {
    maxHeight: 80,
	  minHeight: 80,
	  resize: updateCallback,
	  stop: setTweetText
  }
}
$(function() {
  $( "#flour" ).resizable(resizeableParams(updateHydration));
  $( "#water" ).resizable(resizeableParams(updateHydration));
  $( "#starter" ).resizable($.extend(resizeableParams(updateStarterAndHydration), {alsoResize: "#hydration"}));
	$( "#hydration" ).resizable($.extend(resizeableParams(setStarterHydration), {containment: "#starter"}));
});