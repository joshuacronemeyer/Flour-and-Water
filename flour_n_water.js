$(document).ready(function(){
  var hydration = {
    flour: 0,
    water: 0,
    starter: 0,
    starterHydration: 0,

    addIngredient: function(more, ingredient){
      return this[ingredient] = this[ingredient] + more;
    },
    
    calculateHydration: function(){
      var hydration = ((this.water + this.starterWater())/(this.flour + this.starterFlour())*100);
      return Math.floor(hydration * 100) / 100
    },
    
    starterFlour: function(){
      return (this.starter - this.starterWater());
    },
    
    starterWater: function(){
      return ((this.starter/2.0)*(this.starterHydration/100.0));
    }
    
  }
  
  var waterDiv = $('#water');
  var flourDiv = $('#flour');
  var starterDiv = $('#starter');
  
  var previousControl = null;
  var previousInputs = null;
  var currentControl = null;
  var currentInputs = null;
  
  waterDiv.click(activateControl);
  flourDiv.click(activateControl);
  starterDiv.click(activateControl);
  $("#calculate").click(calculate);
  $('#water-control').focusout(addAmount);
  $('#flour-control').focusout(addAmount);
  $('#starter-control').focusout(addStarterAmount);
  $('#flour-n-water').click(closeAll);

  function activateControl(event){
    previousControl = currentControl;
    previousInputs = currentInputs;
    currentControl = $(this);
    currentInputs = currentControl.children('span[id*="control"]');
    deactivate(previousControl, previousInputs);
    currentControl.toggleClass("fierce normal");
    currentInputs.show();
    event.stopPropagation();
  }
  
  function updateCurrentControl(amount){
    currentControl.find('span[id*="quantity"]').text(amount);
    currentControl.find('input[id*="additional"]').val(0);
  }
  
  function addAmount(){
    var additionalAmount = parseInt(currentControl.find('input[id*="additional"]').val());
    var newAmount = hydration.addIngredient(additionalAmount, currentControl.attr('id'));
    updateCurrentControl(newAmount);
    closeCurrent();
  }
  
  function addStarterAmount(){
    var newHydration = parseInt($("#new-hydration").val());
    hydration.starterHydration = newHydration;
    $("#starter-hydration").text(newHydration);
    addAmount();
  }
  
  function deactivate(control, inputs){
    if (control) {
      control.toggleClass("fierce normal");
      inputs.hide();
    }
  }
  
  function closeCurrent(){
    deactivate(currentControl, currentInputs);
    currentControl = null;
    currentInputs = null;
  }
  
  function closeAll(){
    $(".fierce").toggleClass("fierce normal");
    $("span[id*='control']").hide();
  }
  
  function calculate(){
    $("#result").text(hydration.calculateHydration());
  }
});