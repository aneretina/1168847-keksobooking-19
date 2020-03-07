'use strict';

(function () {
  var getRandomNumber = function (max, min) {
    if (!min) {
      min = 0;
    }
    return Math.round(Math.random() * (max - min) + min);
  };

  var getRandomItem = function (arr) {
    return arr[getRandomNumber(0, arr.length)];
  };

  var getRandomLength = function (arr) {
    return arr.slice(getRandomNumber(0, arr.length));
  };

  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomItem: getRandomItem,
    getRandomLength: getRandomLength,
  };
})();
