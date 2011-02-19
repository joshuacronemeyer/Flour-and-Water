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