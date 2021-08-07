// Save day of week from moment to const
const dayOfWeek = moment().format("dddd MMM Do YYYY"); // Sunday, March 14th 2016 (or something like that)
const inputRefList = [];
const events = [];

// Show the current day at the top of the page
$("#currentDay").append("<div class=>" + dayOfWeek + "</div>");

function init() {
  const savedEvents = JSON.parse(localStorage.getItem("events"));
  for (var i = 9; i < 18; i++) {
    let newEvent;
    if (!savedEvents) {
      newEvent = {
        time: moment().hour(i).format("HH") + ":00",
        event: "",
      };
    } else {
      newEvent = savedEvents[i - 9];
      console.log("newEvent: ", newEvent);
    }
    events.push(newEvent);
  }
  events.forEach((elem) => {
    addElementToDayPlanner(elem.time);
  });
}

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
  input.attr("value", getEventByTime(time));
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
      console.log(saveThisValue);
      addNewEvet(ds, saveThisValue);
    }
  });
}

// Add a string to the event property of the events object
function addNewEvet(time, eventString) {
  const index = getItemIndexByTime(time);
  events[index].event = eventString;
  localStorage.setItem("events", JSON.stringify(events));
}

function getItemIndexByTime(time) {
  for (let x = 0; x < events.length; x += 1) {
    if (events[x].time === time) return x;
  }
}

function getEventByTime(time) {
  const index = getItemIndexByTime(time);
  return events[index].event;
}

init();
