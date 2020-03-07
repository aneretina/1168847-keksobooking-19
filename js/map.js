'use strict';

(function () {
  var isActive = false;

  var activateMap = function () {
    if (isActive) {
      return;
    }
    window.card.map.classList.remove('map--faded');
    window.form.ad.classList.remove('ad-form--disabled');
    window.form.toggleFields(false);
    window.pin.create();
    window.card.show();
    isActive = true;
  };

  var mainPin = document.querySelector('.map__pin--main');

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

  var addressInput = document.querySelector('.ad-form').querySelector('#address');

  var setPinCoordinates = function () {
    var pinCoordinatesLeft = parseInt(mainPin.style.left, 10) + (window.pin.Size.WIDTH / 2);
    var pinCoordinatesTop = isActive ? parseInt(mainPin.style.top, 10) + window.pin.Size.HEIGHT : parseInt(mainPin.style.top, 10) + (window.pin.Size.HEIGHT / 2);
    addressInput.value = pinCoordinatesLeft + ', ' + pinCoordinatesTop;
  };

  window.map = {
    activate: activateMap,
  };
})();
