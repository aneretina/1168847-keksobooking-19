'use strict';

(function () {

  var activateMap = function () {
    window.card.map.classList.remove('map--faded');
    window.form.ad.classList.remove('ad-form--disabled');
    window.form.activateFields();
    window.pin.create();
    window.card.show();
  };

  var mainPin = document.querySelector('.map__pin--main');

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      activateMap();
    }
    setPinCoordinates();
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === window.util.ENTER_KEY) {
      activateMap();
    }
  });

  var addressInput = document.querySelector('.ad-form').querySelector('#address');

  var setPinCoordinates = function () {
    var pinCoordinatesLeft = parseInt(mainPin.style.left, 10) + (window.pin.WIDTH / 2);
    var pinCoordinatesTop = document.querySelector('.ad-form').classList.contains('ad-form--disabled') ? parseInt(mainPin.style.top, 10) + window.pin.height : parseInt(mainPin.style.top, 10) + (window.pin.height / 2);
    addressInput.value = pinCoordinatesLeft + ', ' + pinCoordinatesTop;
  };

  window.map = {
    activate: activateMap,
  };
})();
