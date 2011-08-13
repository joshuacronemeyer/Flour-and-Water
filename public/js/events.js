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

function touchHandler(event)
{
 var touches = event.changedTouches,
    first = touches[0],
    type = "";

     switch(event.type)
{
    case "touchstart": type = "mousedown"; break;
    case "touchmove":  type="mousemove"; break;        
    case "touchend":   type="mouseup"; break;
    default: return;
}
var simulatedEvent = document.createEvent("MouseEvent");
simulatedEvent.initMouseEvent(type, true, true, window, 1,
                          first.screenX, first.screenY,
                          first.clientX, first.clientY, false,
                          false, false, false, 0/*left*/, null);

first.target.dispatchEvent(simulatedEvent);
event.preventDefault();
}

function init()
{
   document.addEventListener("touchstart", touchHandler, true);
   document.addEventListener("touchmove", touchHandler, true);
   document.addEventListener("touchend", touchHandler, true);
   document.addEventListener("touchcancel", touchHandler, true);    
}


$(function() {
  init();
  resetCalculator();
  setTweetText();
  $("#lock").click(toggleLock);
  $("#info").click(function(){$("#overlay").show();});
  $("#overlay").click(function(){
    if ($("#overlay").not(":visible")) {
      $("#overlay").hide();
    }
  });
  $("#flour").resizable(resizeableParams(theFlourChanged));
  $("#water").resizable(resizeableParams(theWaterChanged));
  $("#starter").resizable($.extend(resizeableParams(theStarterChanged), {alsoResize: "#hydration"}));
	$("#hydration").resizable($.extend(resizeableParams(theStarterHydrationChanged), {containment: "#starter"}));
});