'use strict';

(function () {
  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var MainPinCoords = {
    X: 595,
    Y: 445
  };


  var PIN_NUMBERS = 5;
  var fragment = document.createDocumentFragment();

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters-container');

  var createPin = function (pin) {
    var clonedPin = pinTemplate.cloneNode(true);
    var pinIcon = clonedPin.querySelector('img');
    clonedPin.style.left = pin.location.x - PinSize.WIDTH / 2 + 'px';
    clonedPin.style.top = pin.location.y - PinSize.HEIGHT + 'px';

    pinIcon.src = pin.author.avatar;
    pinIcon.alt = pin.offer.title;
    return clonedPin;
  };

  var onPinClick = function (pin) {
    return function () {
      var oldCard = window.card.map.querySelector('.map__card');
      if (oldCard) {
        window.card.map.removeChild(oldCard);
      }
      var card = window.card.show(pin);
      window.card.map.insertBefore(card, mapFilters);
    };
  };

  var setMainPinStartCoords = function () {
    window.map.mainPin.style.left = MainPinCoords.X - PinSize.WIDTH / 2 + 'px';
    window.map.mainPin.style.top = MainPinCoords.Y - PinSize.HEIGHT + 'px';
    return setMainPinStartCoords;
  };

  var successLoadPinData = function (offer) {
    for (var i = 0; i < PIN_NUMBERS; i++) {
      var pin = createPin(offer[i]);
      pin.addEventListener('click', onPinClick(offer[i]));
      pin.addEventListener('keydown', function (evt) {
        if (evt.key === window.utils.ENTER) {
          onPinClick(offer[i]);
        }
      });
      fragment.appendChild(pin);
    }
    mapPins.appendChild(fragment);
  };

  var showPins = function () {
    window.backend.load(successLoadPinData, window.utils.errorDataHandler);
  };

  var removePins = function () {
    var pins = mapPins.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        mapPins.removeChild(pins[i]);
      }
    }
  };

  window.pin = {
    show: showPins,
    onClick: onPinClick,
    remove: removePins,
    setMainPinStartCoords: setMainPinStartCoords,

    Size: {
      WIDTH: PinSize.WIDTH,
      HEIGHT: PinSize.HEIGHT,
    },

    mapPins: mapPins,
  };

})();
