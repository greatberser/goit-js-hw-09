import flatpickr from "flatpickr";

// Функція для підрахунку різниці часу
function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

// Функція для додавання ведучих нулів
function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const timerFields = document.querySelectorAll('.field .value');

// Налаштування flatpickr
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
        alert("Please choose a date in the future");
        startButton.disabled = true;
    } else {
        startButton.disabled = false;
    }
    },
};

const flatpickrInstance = flatpickr(datetimePicker, options);

let countdownInterval;

// ...

startButton.addEventListener('click', () => {
    const selectedDate = flatpickrInstance.selectedDates[0];
    const now = new Date();
    let timeDifference = selectedDate - now;
  
    function updateTimer() {
      if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        timerFields.forEach(field => (field.textContent = '00'));
      } else {
        const time = convertMs(timeDifference);
        timerFields[0].textContent = addLeadingZero(time.days);
        timerFields[1].textContent = addLeadingZero(time.hours);
        timerFields[2].textContent = addLeadingZero(time.minutes);
        timerFields[3].textContent = addLeadingZero(time.seconds);
        timeDifference -= 1000;
      }
    }
  
    updateTimer();
    countdownInterval = setInterval(updateTimer, 1000);
    startButton.disabled = true;
});

  