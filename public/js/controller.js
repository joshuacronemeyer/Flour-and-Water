// Hydration = x is a web based calculator for sourdough bakers.
// Copyright (C) 2011  Josh Cronemeyer
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// For more information please visit the project on github: 
// https://github.com/joshuacronemeyer/Flour-and-Water

// 

function integerInput(selector){
  return parseInt($(selector).text());
}
  
calculator = function() {
  return new HydrationCalculator(
    integerInput('#flour-size'), 
    integerInput('#water-size'), 
    integerInput('#starter-size'), 
    integerInput('#starter-hydration')
    );
}

function setStarterHydration(){
  var percentWidth = parseInt(($('#hydration').width() / $('#starter').width())*100)
  $('#hydration').find('.quality').text(percentWidth);
  var newHydration = calculator().calculateHydration();
  $('#result').text(newHydration);
  $("#info-result").text(newHydration);
}

baseTwitterIframeSRC = "http://platform0.twitter.com/widgets/tweet_button.html?_=1298156795174&count=vertical&lang=en&url=http%3A%2F%2Fjoshuacronemeyer.github.com%2FFlour-and-Water&via=MakingLoaf"
function setTweetText(){
  var hydration = $("#result").text();
  var tweetText = "My sourdough is " + hydration + "% hydration exactly! I calculated it with this:";
  var encodedTweetText = "&text=" + encodeURIComponent(tweetText);
  $("iframe").attr("src", baseTwitterIframeSRC + encodedTweetText);
}

function updateHydration() {
  $(this).find('.quantity').text($(this).width());
  var newHydration = calculator().calculateHydration();
  $('#result').text(newHydration);
  $("#info-result").text(newHydration);
}

function updateStarterAndHydration() { 
  $(this).find('.quantity').text($(this).width());
  setStarterHydration();
  var newHydration = calculator().calculateHydration();
  $('#result').text(newHydration);
  $("#info-result").text(newHydration);
}

function resizeableParams(updateCallback){ 
  return {
    maxHeight: 80,
	  minHeight: 80,
	  resize: updateCallback,
	  stop: setTweetText
  }
}
