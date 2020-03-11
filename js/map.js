'use strict';

(function () {
  var isActive = false;
  var addressInput = document.querySelector('.ad-form').querySelector('#address');
  var mainPin = document.querySelector('.map__pin--main');

  var activateMap = function () {
    if (isActive) {
      return;
    }
    window.card.map.classList.remove('map--faded');
    window.form.ad.classList.remove('ad-form--disabled');
    window.form.activateFields();
    window.load(window.pin.create, window.pin.errorDataHandler);
    isActive = true;
  };

  var deactivateMap = function () {
    window.card.map.classList.add('map--faded');
    window.form.ad.classList.add('ad-form--disabled');
    window.form.deactivateFields();
    isActive = false;
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
    mainPin: mainPin,
    activate: activateMap,
    deactivate: deactivateMap,
    setPinCoordinates: setPinCoordinates
  };
})();
