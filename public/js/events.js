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

$(function() {
  var updateBar = function(e){
     $(e.gesture.target).width(e.gesture.center.x);
     theFlourChanged();
     theWaterChanged();
     theStarterChanged();
     theStarterHydrationChanged();
  };

  var flour = $("#flour");
  var water = $("#water");
  var starter = $("#starter");
  var hydration = $("#hydration");
  flour.hammer().bind("pan", updateBar);
  water.hammer().bind("pan", updateBar);
  starter.hammer().bind("pan", updateBar);
  hydration.hammer().bind("pan", updateBar);

  resetCalculator();
  $("#lock").click(toggleLock);
  $("#info").click(function(){$("#overlay").show();});
  $("#overlay").click(function(){
    if ($("#overlay").not(":visible")) {
      $("#overlay").hide();
    }
  });
});
