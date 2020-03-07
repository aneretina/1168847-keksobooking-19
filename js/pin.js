
'use strict';

(function () {
  var pinSize = {
    WIDTH: 40,
    HEIGHT: 44
  };

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var mapFilters = document.querySelector('.map__filters-container');

  var createPin = function (offerInfo) {
    var clonedPin = pinTemplate.cloneNode(true);
    var pinIcon = clonedPin.querySelector('img');

    clonedPin.style.left = offerInfo.location.x - pinSize.WIDTH / 2 + 'px';
    clonedPin.style.top = offerInfo.location.y - pinSize.HEIGHT + 'px';

    pinIcon.src = offerInfo.author.avatar;
    pinIcon.alt = offerInfo.offer.title;
    return clonedPin;
  };

  var onPinClick = function (pin) {
    return function () {
      var oldCard = window.card.map.querySelector('.map__card');
      if (oldCard) {
        window.card.map.removeChild(oldCard);
      }
      var card = window.card.show[pin];
      window.card.map.insertBefore(card, mapFilters);
    };
  };

  var createPins = function () {
    for (var i = 0; i < window.data.OFFERS_COUNT; i++) {
      var pinData = window.data.genOffer[i];
      var pin = createPin(pinData);
      pin.addEventListener('click', onPinClick);
      fragment.appendChild(createPin([i]));
    }
    mapPins.appendChild(fragment);
  };


  window.pin = {
    create: createPins,

    Size: {
      WIDTH: 40,
      HEIGHT: 44,
      mapPins: mapPins
    }
  };

})();
