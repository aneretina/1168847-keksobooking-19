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
    window.filter.map.classList.remove('ad-form--disabled');
    window.form.activateFields();
    window.utils.loadData();
    window.form.ad.addEventListener('submit', window.form.submit);
    formResetButton.addEventListener('click', window.form.resetHandler);
    isActive = true;
  };

  var deactivateMap = function () {
    isActive = false;
    window.form.ad.reset();
    window.card.map.classList.add('map--faded');
    window.form.ad.classList.add('ad-form--disabled');
    window.filter.map.classList.add('ad-form--disabled');
    window.form.deactivateFields();
    window.pin.remove();
    window.card.close();
    window.form.ad.removeEventListener('submit', window.form.submit);
    formResetButton.removeEventListener('click', window.form.resetHandler);
    window.pin.setMainPinStartCoords();
    window.filter.deactivate();
    window.image.setDefaultImages();
    window.form.setPricedDefaultInput();
  };

  var leftButtonClickHandler = (function (evt) {
    if (evt.button === 0) {
      activateMap();
    }
    setPinCoordinates();
  });

  mainPin.addEventListener('mousedown', leftButtonClickHandler);
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
