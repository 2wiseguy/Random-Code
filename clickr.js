//Game stats
var totalClicks = 0;
var clickPower = 1;
var autoClickPower = 0;
var buyClicksThreshold = 9;
var autoClicksThreshold = 19;
var autoClicksCost = 20;
var buyClicksCost = 10;
var rate = 500;
var gambleClicksThreshold = 499;
var outcome = Math.random();
var autoWinThreshold = 1000;
//elements
var clickCount = document.querySelector("clickCount");
var clickButton = document.querySelector("#click");
var autoClicks = document.querySelector("#click-ot");
var upgradeClicks = document.querySelector("#click-power");
var gambleClicks = document.querySelector("#gamble");
var autoWin = document.querySelector("#autoWin");

window.onload = function () {
   console.log("Initiate");
};
//Show buttons when threshold is crossed
var clickEventListener = function () {
   totalClicks += clickPower;
   clickButton.innerHTML = "Clicks: " + totalClicks;
   if (totalClicks > autoClicksThreshold) {
      autoClicks.style.display = "block";
   }
   if (totalClicks > buyClicksThreshold) {
      upgradeClicks.style.display = "block";
   }

   if (totalClicks > gambleClicksThreshold) {
      gambleClicks.style.display = "block";
   }

   if (totalClicks > autoWinThreshold) {
      autoWin.style.display = "block";
   }
};


//Event Listeners

//Click Power
var upgradeClicksListener = function () {
   if (totalClicks < buyClicksCost) return;

   clickPower += 1;
   totalClicks -= buyClicksCost;
   buyClicksCost += 10;

   clickButton.innerHTML = "Clicks: " + totalClicks;
   upgradeClicks.innerHTML = "Increase Click Power: " + buyClicksCost;
};

//Clicks over time
var autoClicksListener = function () {
   if (totalClicks < autoClicksCost) return;
   autoClickPower += 1;
   totalClicks -= autoClicksCost;
   autoClicksCost += 20;

   clickButton.innerHTML = "Clicks: " + totalClicks;
   autoClicks.innerHTML = "Buy Autoclick: " + autoClicksCost;
};

//Gambling clicks
var gambleClicksListener = function () {
   if (totalClicks < autoClicksCost) return;


   if (outcome > 0.5) {
      totalClicks *= 2;
      console.log(outcome);
      alert("You win, clicks doubled")
   }

   if (outcome < 0.5) {
      totalClicks /= 2;
      console.log(outcome);
      alert("You lose, clicks halved");
   }
   clickButton.innerHTML = "Clicks: " + totalClicks;
};

var autoWinListener = function () {
   if (totalClicks < autoClicksCost) return;

   if (outcome > 0.999) {
      alert("Congrats, you won the cheap way...");
      console.log(outcome);
      totalClicks += 1e+32;
   }
   if (outcome < 0.999) {
      alert("Told you not to press this...")
      console.log(outcome);
      totalClicks -= 1e+32;
   }
   clickButton.innerHTML = "Clicks: " + totalClicks;
};

var clickIntervalListener = function () {
   totalClicks += autoClickPower;

   clickButton.innerHTML = "Clicks: " + totalClicks;
};


// Execute
setInterval(clickIntervalListener, rate);
clickButton.addEventListener("click", clickEventListener);
upgradeClicks.addEventListener("click", upgradeClicksListener);
autoClicks.addEventListener("click", autoClicksListener);
gambleClicks.addEventListener("click", gambleClicksListener);
autoWin.addEventListener("click", autoWinListener);
