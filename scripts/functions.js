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

  document.getElementById('stand-by-title').textContent =
      ('0' + timespan.hours).slice(-2) + ':' +
      ('0' + timespan.minutes).slice(-2) + ':' +
      ('0' + timespan.seconds).slice(-2);

  setTimeout(insertCountdown, 1000);
};

function getData() {
  var request = new XMLHttpRequest();

  request.open('GET', 'http://localhost:8080/v1/data');

  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      if (request.responseText) {
        var data = {};

        try {
          data = JSON.parse(request.responseText) || {};
        } catch (e) {
          console.error(new Error(e));
        }

        var totalFollowersNode = document.getElementById('total-followers');
        var totalSubscribersNode = document.getElementById('total-subscribers');
        var latestFollowerNode = document.getElementById('latest-follower');
        var latestSubscriberNode = document.getElementById('latest-subscriber');

        if (totalFollowersNode && data.totalFollowers) {
          totalFollowersNode.textContent = numeral(data.totalFollowers || 0).format('0,0');
          totalFollowersNode.style.display = 'flex';
        }

        if (totalSubscribersNode && data.totalSubscribers) {
          var textContent = numeral(data.totalSubscribers || 0).format('0,0');
          if (data.subscriberGoal) textContent = textContent + '/' + numeral(data.subscriberGoal || 0).format('0,0');

          totalSubscribersNode.textContent = textContent;
          totalSubscribersNode.style.display = 'flex';
        }

        if (latestFollowerNode && data.latestFollower.name) {
          latestFollowerNode.textContent = data.latestFollower.name;
        }

        if (latestSubscriberNode && data.latestSubscriber.name) {
          latestSubscriberNode.textContent = data.latestSubscriber.name;
        }
      }

      adjustInfoLength();
      setTimeout(getData, 15000);
    }
  };

  request.send();
};

function adjustInfoLength() {
  var latestFollowerNode = document.getElementById('latest-follower');
  var latestSubscriberNode = document.getElementById('latest-subscriber');

  if (latestFollowerNode) {
    var latestFollowerContainerWidth = Number(window.getComputedStyle(latestFollowerNode.parentNode).width.split('px')[0]);
    var latestFollowerWidth = Number(window.getComputedStyle(latestFollowerNode).width.split('px')[0]);

    if (latestFollowerContainerWidth < latestFollowerWidth) latestFollowerNode.setAttribute('style', 'align-self: flex-start;');
    else latestFollowerNode.setAttribute('style', '');
  }

  if (latestSubscriberNode) {
    var latestSubscriberContainerWidth = Number(window.getComputedStyle(latestSubscriberNode.parentNode).width.split('px')[0]);
    var latestSubscriberWidth = Number(window.getComputedStyle(latestSubscriberNode).width.split('px')[0]);

    if (latestSubscriberContainerWidth < latestSubscriberWidth) latestSubscriberNode.setAttribute('style', 'align-self: flex-start;');
    else latestSubscriberNode.setAttribute('style', '');
  }
};
