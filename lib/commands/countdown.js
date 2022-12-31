const { execSync } = require('child_process')

function countdown(str, options) {
  const title = options.title || 'Unknown Countdown';
  const expired = options.expired || 'EXPIRED!';
  const date = str || 'Jan 5, 2024 15:37:25'

  // One time create. Used for the notification channel
  const random = Math.floor(Math.random() * 9999)

  const notify = (message) => {
    execSync(`cmd notification post -S bigtext -t "${title}" "${random}" "${message}"`, { uid: 2000 })
  }

  const countDownDate = new Date(date).getTime();

  // Update the count down every 1 second
  const x = setInterval(function() {

    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an notification 
    notify(days + "d " + hours + "h " +
      minutes + "m " + seconds + "s ")

    // If the count down is over, write some text 
    if (distance < 0) {
      clearInterval(x);
      notify(expired)
    }
  }, 1000);

}

module.exports = countdown;