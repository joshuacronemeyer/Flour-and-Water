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

function  textAsInt(selector){
  return parseInt($(selector).text());
}

function  widthAsInt(selector){
  return parseInt($(selector).width());
}

function resetCalculator(){
  hydrationCalculator = new HydrationCalculator(
     textAsInt('#flour-size'), 
     textAsInt('#water-size'), 
     textAsInt('#starter-size'), 
     textAsInt('#starter-hydration')
    );
}

function theWaterChanged() {
  var water =  $("#water").width();
  $("#water-size").text(water);
  calculateAndSetHydrationAndWeight({"water": water});
  if (hydrationIsLocked()){
    $('#flour').width(hydrationCalculator.flour);
    $("#flour-size").text($("#flour").width());
  }
}

function theFlourChanged() {
  var flour =  $("#flour").width();
  $("#flour-size").text(flour);
  calculateAndSetHydrationAndWeight({"flour": flour});
  if (hydrationIsLocked()){
    $('#water').width(hydrationCalculator.water);
    $("#water-size").text($("#water").width());
  }
}

function theStarterChanged() { 
  var starter =  $("#starter").width();
  $("#starter-size").text(starter);
  calculateAndSetHydrationAndWeight({"starter": starter});

  if($('#starter').width() <  $('#hydration').width()) {
    $('#hydration').width($('#starter').width())
  }
}

function theStarterHydrationChanged(){
  var percentHydration = parseInt(2*($('#hydration').width() / $('#starter').width())*100)
  $('#starter-hydration').text(percentHydration);
  calculateAndSetHydrationAndWeight({"starterHydration": percentHydration});
}

function calculateAndSetHydrationAndWeight(changes) {
  hydrationCalculator.update($.extend(changes, {"hydrationLock": hydrationIsLocked()}));
  $('#result').text(hydrationCalculator.hydration());
  $("#info-result").text(hydrationCalculator.hydration());
  $('#dough-weight').text(hydrationCalculator.weight());
  $('#salt-weight').text(hydrationCalculator.recommendedSalt());
  $('#starter-percent').text(hydrationCalculator.percentStarter());
}

function hydrationIsLocked() {
  return !$('#lock').hasClass("hydrationUnlocked");
}

function toggleLock() {
  $('#lock').toggleClass("hydrationUnlocked");
  $("#hydration").resizable( "option", "disabled", hydrationIsLocked() );
  $("#starter").resizable( "option", "disabled", hydrationIsLocked() );
}
