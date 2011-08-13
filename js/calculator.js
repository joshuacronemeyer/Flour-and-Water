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

$(document).ready(function(){
  function integerInput(selector){
    return parseInt($(selector).text());
  }
  
  calculator = {
    flour: integerInput('#flour-size'),
    water: integerInput('#water-size'),
    starter: integerInput('#starter-size'),
    starterHydration: integerInput('#starter-hydration'),

    addIngredient: function(more, ingredient){
      return this[ingredient] = this[ingredient] + more;
    },
  
    calculateHydration: function(){
      var hydration = (((this.water + this.starterWater())/(this.flour + this.starterFlour()))*100);
      var roundedHydration =  Math.round(hydration);
      if (isNaN(roundedHydration)){
        return 0;
      }
      return roundedHydration;
    },
  
    starterFlour: function(){
      return (this.starter/ (1+(this.starterHydration/100.0)));
    },
  
    starterWater: function(){
      return this.starter - this.starterFlour();
    },
  
    reload: function(){
      this.flour = integerInput('#flour-size');
      this.water = integerInput('#water-size');
      this.starter = integerInput('#starter-size');
      this.starterHydration = integerInput('#starter-hydration');
    },
    
    resetHydration: function(){
      this.reload();
      $('#result').text(this.calculateHydration());
    }
  }
});