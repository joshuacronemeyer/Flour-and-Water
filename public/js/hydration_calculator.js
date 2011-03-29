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

function HydrationCalculator(flour, water, starter, starterHydration) {
  this.flour = flour;
  this.water = water;
  this.starter = starter;
  this.starterHydration = starterHydration;
  this.hydrationLock = false;
}

HydrationCalculator.prototype.update = function(changes) {
  if (changes.hydrationLock != undefined) { this.hydrationLock = changes.hydrationLock; }
  var originalThis = jQuery.extend({}, this);
  this._updateAllQuantities(changes);
  if (this.hydrationLock) {
    this._compensateToMaintainHydration(originalThis);
  }
}

HydrationCalculator.prototype.hydration = function() {
  var hydration = (((this.water + this.starterWater())/(this.flour + this.starterFlour()))*100);
  return this._round(hydration);
}

HydrationCalculator.prototype.weight = function() {
  return this.flour + this.water + this.starter;
}

HydrationCalculator.prototype._round = function(decimal) {
  var roundedDecimal =  Math.round(decimal);
  if (isNaN(roundedDecimal)){
   return 0;
  }
  return roundedDecimal;
}

HydrationCalculator.prototype.starterFlour = function() {
  return (this.starter/ (1+(this.starterHydration/100.0)));
}

HydrationCalculator.prototype.starterWater = function() {
  return this.starter - this.starterFlour();
}

HydrationCalculator.prototype._updateAllQuantities = function(changes) {
  if (changes.water != undefined) { this.water = changes.water; }
  if (changes.flour != undefined) { this.flour = changes.flour; }
  if (changes.starter != undefined) { this.starter = changes.starter; }
  if (changes.starterHydration != undefined) { this.starterHydration = changes.starterHydration; }
}

HydrationCalculator.prototype._diff = function(thatCalculator) {
    console.log(thatCalculator);
  return {
    "flour" : this.flour - thatCalculator.flour,
    "water" : this.water - thatCalculator.water 
  };
}

HydrationCalculator.prototype._compensateToMaintainHydration = function(thatCalculator) {
  var diff = this._diff(thatCalculator);
  this.flour = this.flour + diff.water;
  this.water = this.water + diff.flour;
}