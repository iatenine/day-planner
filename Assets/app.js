// Save day of week from moment to const
const dayOfWeek = moment().format("dddd MMM Do YYYY"); // Sunday, March 14th 2016 (or something like that)
const inputRefList = [];
const busHours = [];

$("#currentDay").append("<div class=>" + dayOfWeek + "</div>");

function init() {
  for (var i = 9; i < 18; i++) {
    busHours.push(moment().hour(i).format("HH") + ":00");
  }
  busHours.forEach((elem) => {
    addElementToDayPlanner(elem);
  });
}
init();
console.log(busHours);

function addElementToDayPlanner(time) {
  // Needs a label, text input area and a button
  const divWrapper = $("<div>");
  const planner = $("#day-planner");
  const label = $("<label>");
  const input = $("<input>");
  const button = $("<button>");
  label.html(time);
  input.attr("type", "text");
  input.attr("data-index", time);
  button.html("Add");
  button.attr("data-index", time);
  divWrapper.append(label);
  divWrapper.append(input);
  divWrapper.append(button);
  divWrapper.on("click", "button", handleButtonClick);
  planner.append(divWrapper);
  inputRefList.push(input);
}

function handleButtonClick(e) {
  const ds = e.currentTarget.dataset.index;
  inputRefList.forEach((elem) => {
    const dsCheck = elem[0].dataset.index;
    if (ds === dsCheck) {
      // Save to local storage
      const saveThisValue = elem[0].value;
    }
  });
}
