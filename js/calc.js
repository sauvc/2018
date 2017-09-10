var taskPoints = 0;
var task3Points = 0;
var runTimePoints = 0;
var runTimeBonusLabel;
var totalEl;
var endOfAttemptInput;
var runtimeInput;
window.addEventListener('load', function(){
  totalEl = document.getElementById('total-points');
  var allCheckInputs = document.querySelectorAll('input[type=checkbox]');
  for (index = 0; index < allCheckInputs.length; index++){
    allCheckInputs[index].addEventListener('change', recalculatePoints)
  }
  var task3Inputs = document.querySelectorAll('#task2 input[type=radio]');
  for (index = 0; index < task3Inputs.length; index++){
    task3Inputs[index].addEventListener('change', recalculateTask3Points)
  }

  runTimeBonusLabel = document.getElementById('run-time-bonus');
  runtimeInput = document.getElementById('run-time');
  endOfAttemptInput = document.getElementById('end-of-attempt')

  runtimeInput.addEventListener('input', recalculateRunTimeBonus);
});

function recalculateRunTimeBonus(){
    var bonus = parseFloat((((900 - parseFloat(runtimeInput.value)) * 0.03) || 0).toFixed(2));
    if (endOfAttemptInput.checked){
      runTimeBonusLabel.innerHTML = bonus;
      runTimePoints = bonus;
    }else{
      runTimeBonusLabel.innerHTML = 0;
      runTimePoints = 0;
    }
    updateTotal();
}

function recalculatePoints(ev){
  if (ev.target.checked){
    taskPoints += parseInt(ev.target.dataset.points);
  }else {
    taskPoints -= parseInt(ev.target.dataset.points);
  }
  if (ev.target == endOfAttemptInput){
    recalculateRunTimeBonus();
  }
  updateTotal()
}

function recalculateTask3Points(ev){
  task3Points = parseInt(ev.target.dataset.points);
  updateTotal();
}

function updateTotal(){
  totalEl.innerHTML = "Total = " + (taskPoints+task3Points+runTimePoints) + " pts";
}
