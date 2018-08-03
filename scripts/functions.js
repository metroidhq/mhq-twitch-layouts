function startDataSlideshow() {
  var currentSlide = 0;
  var slides = document.querySelectorAll('#info-boxes .info-box:not(.skip)');

  setInterval(function () {
    slides[currentSlide].className = 'info-box';
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].className = 'info-box active';
  }, 15000);
};

function insertCountdown() {
  var timespan = countdown(null, new Date('Fri Aug 3 2018 12:00:00 GMT-0700 (PDT)'));

  document.getElementById('stand-by-title').innerText =
      ('0' + timespan.hours).slice(-2) + ':' +
      ('0' + timespan.minutes).slice(-2) + ':' +
      ('0' + timespan.seconds).slice(-2);

  setTimeout(insertCountdown, 1000);
};

function getDonationAmount() {
  var request = new XMLHttpRequest();

  request.open('GET', 'https://tiltify.com/api/v3/campaigns/6fa4ecfefcee8f80918a2ac51c2ae0c9');
  request.setRequestHeader('Authorization', 'Bearer 31c598ad64adc91b52950ca8cbdb5354f623d99fd1c54f7440f668ce1f6bccc9')

  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      if (request.responseText) {
        var data = {};

        try {
          data = JSON.parse(request.responseText).data || {};
          document.getElementById('donation-amount').innerText = '$' + numeral(data.amountRaised || 0).format('0,0.00');
        } catch (e) {
          console.error(new Error(e));
        }
      }

      setTimeout(getDonationAmount, 10000);
    }
  };

  request.send();
};

function getLatestDonation() {
  var request = new XMLHttpRequest();

  request.open('GET', 'https://tiltify.com/api/v3/campaigns/6fa4ecfefcee8f80918a2ac51c2ae0c9/donations');
  request.setRequestHeader('Authorization', 'Bearer 31c598ad64adc91b52950ca8cbdb5354f623d99fd1c54f7440f668ce1f6bccc9')

  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      if (request.responseText) {
        var data = {};

        try {
          data = JSON.parse(request.responseText).data[0] || {};
          if (data.name) document.getElementById('latest-donation').innerText = data.name + ': $' + numeral(data.amount || 0).format('0.00');
        } catch (e) {
          console.error(new Error(e));
        }
      }

      setTimeout(getLatestDonation, 30000);
    }
  };

  request.send();
};

function adjustInfoLength() {
  var latestDonation = document.getElementById('latest-donation');
  var nextGame = document.getElementById('next-game');

  var containerWidth = Number(window.getComputedStyle(nextGame.parentNode).width.split('px')[0]);
  var latestDonationWidth = Number(window.getComputedStyle(latestDonation).width.split('px')[0]);
  var nextGameWidth = Number(window.getComputedStyle(nextGame).width.split('px')[0]);

  if (containerWidth < latestDonationWidth) latestDonation.setAttribute('style', 'align-self: flex-start;');
  if (containerWidth < nextGameWidth) nextGame.setAttribute('style', 'align-self: flex-start;');

  setTimeout(adjustInfoLength, 15000);
};
