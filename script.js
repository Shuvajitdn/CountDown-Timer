var start = document.getElementById('start');
var pause = document.getElementById('pause');
var reset = document.getElementById('reset');
var h = document.getElementById("hour");
var m = document.getElementById("minute");
var s = document.getElementById("sec");
var progressBar = document.getElementById('progress-bar');
var message = document.getElementById('message');
var confetti = document.getElementById('confetti');

var startTimer = null;
var totalSeconds = 0;
var isPaused = false;
var initialTotalSeconds = 0;

// Function to start the countdown
start.addEventListener('click', function () {
    if (isPaused) {
        isPaused = false;
        startInterval();
    } else {
        totalSeconds = (parseInt(h.value) * 3600) + (parseInt(m.value) * 60) + parseInt(s.value);
        if (totalSeconds <= 0) return; // Prevent starting if time is 0
        initialTotalSeconds = totalSeconds; // Store initial time
        startInterval();
        changeBackground(); // Random background change when the timer starts
    }
});

// Function to handle the countdown logic
function startInterval() {
    start.disabled = true;  // Disable the start button during countdown
    pause.disabled = false;  // Enable the pause button
    reset.disabled = false;  // Enable reset button

    startTimer = setInterval(function () {
        if (totalSeconds <= 0) {
            clearInterval(startTimer);
            playSound();
            displayMessage();
            start.disabled = false; // Enable start button after completion
            return;
        }

        totalSeconds--;
        updateTimeDisplay();
        updateProgressBar();
    }, 1000);
}

// Update the time display after each second
function updateTimeDisplay() {
    var hoursLeft = Math.floor(totalSeconds / 3600);
    var minutesLeft = Math.floor((totalSeconds % 3600) / 60);
    var secondsLeft = totalSeconds % 60;

    h.value = hoursLeft;
    m.value = minutesLeft;
    s.value = secondsLeft;
}

// Update the progress bar
function updateProgressBar() {
    var progress = (1 - totalSeconds / initialTotalSeconds) * 100;
    progressBar.style.width = progress + "%";
}

// Function to reset the timer
reset.addEventListener('click', function () {
    clearInterval(startTimer);
    h.value = 0;
    m.value = 0;
    s.value = 0;
    progressBar.style.width = "0%";
    totalSeconds = 0;
    initialTotalSeconds = 0;
    message.style.display = "none";
    confetti.style.display = "none"; // Hide confetti
    start.disabled = false;  // Enable the start button
    pause.disabled = true;   // Disable pause button
    reset.disabled = true;   // Disable reset button
    isPaused = false;
});

// Pause the countdown
pause.addEventListener('click', function () {
    clearInterval(startTimer);
    isPaused = true;
    start.disabled = false;  // Re-enable start button after pause
    pause.disabled = true;   // Disable pause button after pause
});

// Play a sound when the timer reaches 0
function playSound() {
    var audio = new Audio('https://www.soundjay.com/button/beep-07.wav');
    audio.play();
}

// Display the "Time's Up!" message
function displayMessage() {
    message.style.display = "block";
    message.innerHTML = "Time's Up!";
    confetti.style.display = "block"; // Show confetti animation
    setTimeout(function () {
        message.style.display = "none";
        confetti.style.display = "none"; // Hide confetti after 3 seconds
    }, 3000);
}

// Change the background randomly when the timer starts
function changeBackground() {
    var backgrounds = ['url("bg1.jpg")', 'url("bg2.jpg")', 'url("bg3.jpg")'];
    var randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.style.backgroundImage = randomBg;
}
