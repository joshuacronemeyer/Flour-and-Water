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
  if (this.hydrationLock) {
    this._compensateToMaintainHydration(changes);
  } else {
    this._updateAllQuantities(changes);
  }
}

HydrationCalculator.prototype.hydration = function() {
  return this._round(this._hydration());
}

HydrationCalculator.prototype.weight = function() {
  return this.flour + this.water + this.starter;
}

HydrationCalculator.prototype.starterFlour = function() {
  return (this.starter/ (1+(this.starterHydration/100.0)));
}

HydrationCalculator.prototype.starterWater = function() {
  return this.starter - this.starterFlour();
}

HydrationCalculator.prototype.recommendedSalt = function() {
  return this._round(this.weight()*0.011);
}

HydrationCalculator.prototype.percentStarter = function() {
  return this._round((this.starter/this.weight())*100);
}

HydrationCalculator.prototype._hydration = function() {
  return (((this.water + this.starterWater())/(this.flour + this.starterFlour()))*100);
}

HydrationCalculator.prototype._round = function(decimal) {
  var roundedDecimal =  Math.round(decimal);
  if (isNaN(roundedDecimal)){
   return 0;
  }
  return roundedDecimal;
}

HydrationCalculator.prototype._updateAllQuantities = function(changes) {
  if (changes.water != undefined) { this.water = changes.water; }
  if (changes.flour != undefined) { this.flour = changes.flour; }
  if (changes.starter != undefined) { this.starter = changes.starter; }
  if (changes.starterHydration != undefined) { this.starterHydration = changes.starterHydration; }
}

HydrationCalculator.prototype._compensateToMaintainHydration = function(changes) {
  var calculatedHydration = this.hydration();
  if (changes.water != undefined) { 
    this.water = changes.water;
    this._balanceFlour(calculatedHydration); 
  }
  if (changes.flour != undefined) { 
    this.flour = changes.flour;
    this._balanceWater(calculatedHydration);
  }
}

HydrationCalculator.prototype._balanceFlour = function(calculatedHydration){
  this.flour = this._round(((this.water + this.starterWater())/(calculatedHydration/100)) - this.starterFlour());
}
    
HydrationCalculator.prototype._balanceWater = function(calculatedHydration){
  this.water = this._round(((calculatedHydration/100)*(this.flour + this.starterFlour()))-this.starterWater());
}