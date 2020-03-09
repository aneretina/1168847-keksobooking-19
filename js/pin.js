'use strict';

(function () {
  var PinSize = {
    WIDTH: 40,
    HEIGHT: 44
  };

  var ENTER = 'Enter';

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
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

  var createPins = function () {
    for (var i = 0; i < 5; i++) {
      var pinData = window.data.offers[i];
      var pin = createPin(pinData);
      pin.addEventListener('click', onPinClick(pinData));
      pin.addEventListener('keydown', function (evt) {
        if (evt.key === ENTER) {
          onPinClick(pinData);
        }
      });
      fragment.appendChild(pin);
    }
    mapPins.appendChild(fragment);
  };

  window.pin = {
    create: createPins,

    Size: {
      WIDTH: 40,
      HEIGHT: 44,
    },

    mapPins: mapPins
  };

})();
