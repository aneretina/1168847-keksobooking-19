
'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 44;
  var OFFERS_COUNT = 8;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  // Клонирую шаблон для обектов

  var createPin = function (offerInfo) {
    var clonedPin = pinTemplate.cloneNode(true);
    clonedPin.style.left = offerInfo.location.x - PIN_WIDTH / 2 + 'px';
    clonedPin.style.top = offerInfo.location.y - PIN_HEIGHT + 'px';
    var pinIcon = clonedPin.querySelector('img');
    pinIcon.src = offerInfo.author.avatar;
    pinIcon.alt = offerInfo.offer.title;

    return clonedPin;
  };
  // создание фрагмента
  var fragment = document.createDocumentFragment();

  var createPins = function () {
    for (var i = 0; i < OFFERS_COUNT; i++) {
      fragment.appendChild(createPin(window.data.genOffer[i]));
    }
    mapPins.appendChild(fragment);
  };

  window.pin = {
    create: createPins,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT
  };

})();
