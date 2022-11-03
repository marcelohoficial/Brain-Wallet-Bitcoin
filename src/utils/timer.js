let agora = Math.floor(new Date().getTime() / 1.0);
let amanha = new Date(`2022-10-25 00:00:00`).valueOf() + 86400000;

function callEveryHour() {
  setInterval(marcelo, 1000 * 60);
}

var nextDate = new Date();
if (nextDate.getMinutes() === 0) {
  // You can check for seconds here too
  callEveryHour();
} else {
  nextDate.setHours(nextDate.getHours() + 1);
  nextDate.setMinutes(0);
  nextDate.setSeconds(0); // I wouldn't do milliseconds too ;)

  var difference = nextDate - new Date();
  setTimeout(callEveryHour, difference);
}
