'use strict';

(function () {
  var isActive = false;
  var mainPin = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('.ad-form').querySelector('#address');

  var activateMap = function () {
    if (isActive) {
      return;
    }
    window.card.map.classList.remove('map--faded');
    window.form.ad.classList.remove('ad-form--disabled');
    window.form.activateFields();
    window.pin.create();
    isActive = true;
  };

  var onLeftButtonClick = (function (evt) {
    if (evt.button === 0) {
      activateMap();
    }
    setPinCoordinates();
  });

  mainPin.addEventListener('mousedown', onLeftButtonClick);
  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === window.util.ENTER_KEY) {
      activateMap();
    }
  });

  var setPinCoordinates = function () {
    var pinCoordinatesLeft = parseInt(mainPin.style.left, 10) + (window.pin.Size.WIDTH / 2);
    var pinCoordinatesTop = isActive ? parseInt(mainPin.style.top, 10) + window.pin.Size.HEIGHT : parseInt(mainPin.style.top, 10) + (window.pin.Size.HEIGHT / 2);
    addressInput.value = pinCoordinatesLeft + ', ' + pinCoordinatesTop;
  };

  window.map = {
    activate: activateMap,
  };
})();
