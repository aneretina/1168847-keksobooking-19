'use strict';

(function () {
  var RESIDENCE_TYPES = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
    palace: 'Дворец'
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // создаю карточки на основе данных
  var createCard = function (cardElement) {
    var clonedCard = cardTemplate.cloneNode(true);
    clonedCard.querySelector('.popup__avatar').src = cardElement.author.avatar;
    clonedCard.querySelector('.popup__title').textContent = cardElement.offer.title;
    clonedCard.querySelector('.popup__text--address').textContent = cardElement.offer.address;
    clonedCard.querySelector('.popup__text--price').textContent = cardElement.offer.price + '₽/ночь';
    clonedCard.querySelector('.popup__type').textContent = RESIDENCE_TYPES[cardElement.offer.type];
    clonedCard.querySelector('.popup__text--capacity').textContent = cardElement.offer.rooms + ' комнаты для ' + cardElement.offer.guests + ' гостей';
    clonedCard.querySelector('.popup__text--time').textContent = 'заезд после ' + cardElement.offer.checkin + ', выезд до ' + cardElement.offer.checkout;
    clonedCard.querySelector('.popup__description').textContent = cardElement.offer.description;

    var photosCard = clonedCard.querySelector('.popup__photos');
    var photoCard = photosCard.querySelector('.popup__photo');
    photosCard.innerHTML = '';
    for (var i = 0; i < cardElement.offer.photos.length; i++) {
      var photo = photoCard.cloneNode(true);
      photo.src = cardElement.offer.photos[i];
      photosCard.appendChild(photo);
    }
    return clonedCard;
  };

  // Задание 4.2 Карточки объявлений
  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters-container');

  var closeCard = function () {
    var newCard = map.querySelector('.map__card');
    if (newCard) {
      map.removeChild(newCard);
    }
  };

  var mapPins = document.querySelector('.map__pins');

  var showCard = function () {
    var pinsWithoutMain = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    pinsWithoutMain.forEach(function (pin) {
      pin.addEventListener('click', function () {
        var oldCard = map.querySelector('.map__card');
        if (oldCard) {
          map.removeChild(oldCard);
        }
        var card = createCard(window.data.genOffer[0]);
        map.insertBefore(card, mapFilters);

      });
    });

    map.querySelector('.map__card').addEventListener('click', closeCard);
    map.querySelector('.popup__close').addEventListener('click', closeCard);

    document.addEventListener('keydown', window.utils.keydownHandler);

  };


  window.card = {
    map: map,
    create: createCard,
    close: closeCard,
    show: showCard
  };
})();
