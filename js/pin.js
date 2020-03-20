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

  var PIN_COUNT = 5;
  var fragment = document.createDocumentFragment();

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  var createPin = function (pin) {
    var clonedPin = pinTemplate.cloneNode(true);
    var pinIcon = clonedPin.querySelector('img');
    clonedPin.style.left = pin.location.x - PinSize.WIDTH / 2 + 'px';
    clonedPin.style.top = pin.location.y - PinSize.HEIGHT + 'px';
    pinIcon.src = pin.author.avatar;
    pinIcon.alt = pin.offer.title;
    return clonedPin;
  };

  var setMainPinStartCoords = function () {
    window.map.mainPin.style.left = MainPinCoords.X - PinSize.WIDTH / 2 + 'px';
    window.map.mainPin.style.top = MainPinCoords.Y - PinSize.HEIGHT + 'px';
    return setMainPinStartCoords;
  };

  var renderPins = function (offers) {
    for (var i = 0; i < offers.length; i++) {
      if (i === PIN_COUNT) {
        break;
      }
      var pin = createPin(offers[i]);
      pin.addEventListener('click', window.card.activate(offers[i]));
      pin.addEventListener('keydown', function (evt) {
        if (evt.key === window.utils.ENTER) {
          window.card.activate(offers[i]);
          console.log(offers)
        }
      });
      fragment.appendChild(pin);
    }
    mapPins.appendChild(fragment);
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
    remove: removePins,
    setMainPinStartCoords: setMainPinStartCoords,
    render: renderPins,
    count: PIN_COUNT,


    Size: {
      WIDTH: PinSize.WIDTH,
      HEIGHT: PinSize.HEIGHT,
    },

    mapPins: mapPins,
  };

})();
