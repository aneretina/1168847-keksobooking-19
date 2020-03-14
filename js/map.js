'use strict';

(function () {
  var isActive = false;
  var addressInput = document.querySelector('.ad-form').querySelector('#address');
  var mainPin = document.querySelector('.map__pin--main');
  var formResetButton = window.form.ad.querySelector('.ad-form__reset');


  var activateMap = function () {
    if (isActive) {
      return;
    }
    window.card.map.classList.remove('map--faded');
    window.form.ad.classList.remove('ad-form--disabled');
    window.form.activateFields();
    window.pin.show();
    window.form.ad.addEventListener('change', window.form.checkFieldsValidty);
    window.form.ad.addEventListener('submit', window.form.submit);
    formResetButton.addEventListener('click', deactivateMap);
    isActive = true;
  };

  var deactivateMap = function () {
    isActive = false;
    window.form.ad.reset();
    window.card.map.classList.add('map--faded');
    window.form.ad.classList.add('ad-form--disabled');
    window.form.deactivateFields();
    window.pin.remove();
    window.form.ad.removeEventListener('submit', window.form.submit);
    window.form.ad.removeEventListener('change', window.form.checkFieldsValidty);
    formResetButton.removeEventListener('click', deactivateMap);
    window.pin.setMainPinStartCoords();
  };

  var onLeftButtonClick = (function (evt) {
    if (evt.button === 0) {
      activateMap();
    }
    setPinCoordinates();
  });

  mainPin.addEventListener('mousedown', onLeftButtonClick);
  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.ENTER) {
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
