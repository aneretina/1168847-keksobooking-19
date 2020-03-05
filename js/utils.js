'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var getRandomItem = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var getRandomLength = function (arr) {
    return arr.slice(getRandomNumber(0, arr.length - 1));
  };

  function keydownHandler(evt) {
    evt.preventDefault();
    if (evt.key === ESC_KEY || evt.key === ENTER_KEY) {
      window.card.closeCard();
    }
  }

  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomItem: getRandomItem,
    getRandomLength: getRandomLength,
    keydownHandler: keydownHandler
  };
})();
