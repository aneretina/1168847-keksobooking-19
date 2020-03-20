'use strict';

(function () {
  var AccomodationTypes = {
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало',
    PALACE: 'Дворец'
  };

  var AccomodationPhotos = {
    NAME: 'Фотография жилья',
    WIDTH: '45',
    HEIGHT: '40'
  };

  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFilters = document.querySelector('.map__filters-container');

  var setCardValue = function (node, className, value) {
    var cardItem = node.querySelector(className);
    if (value) {
      cardItem.textContent = value;
    } else {
      cardItem.style.display = 'none';
    }
  };

  var createFeature = function (value) {
    var featureElement = document.createElement('li');
    featureElement.className = 'popup__feature popup__feature--' + value;
    return featureElement;
  };

  var createPhoto = function (value) {
    var photoElement = document.createElement('img');
    photoElement.className = 'popup__photo';
    photoElement.src = value;
    photoElement.alt = AccomodationPhotos.NAME;
    photoElement.width = AccomodationPhotos.WIDTH;
    photoElement.height = AccomodationPhotos.HEIGHT;
    return photoElement;
  };

  var setValuesForElems = function (values, cb, node, className) {
    var unit = node.querySelector(className);
    unit.innerHTML = '';

    values.forEach(function (item) {
      var element = cb(item);

      unit.appendChild(element);
    });
  };

  var createCard = function (pin) {
    var clonedCard = cardTemplate.cloneNode(true);
    clonedCard.querySelector('.popup__avatar').src = pin.author.avatar;
    setCardValue(clonedCard, '.popup__title', pin.offer.title);
    setCardValue(clonedCard, '.popup__text--address', pin.offer.address);
    setCardValue(clonedCard, '.popup__text--price', pin.offer.price ? pin.offer.price + '₽/ночь' : '');
    setCardValue(clonedCard, '.popup__type', AccomodationTypes[pin.offer.type.toUpperCase()]);
    setCardValue(clonedCard, '.popup__text--capacity', pin.offer.rooms && pin.offer.guests ? pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей' : '');
    setCardValue(clonedCard, '.popup__text--time', pin.offer.checkin && pin.offer.checkout ? 'заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout : '');
    setCardValue(clonedCard, '.popup__description', pin.offer.description);

    setValuesForElems(pin.offer.photos, createPhoto, clonedCard, '.popup__photos');
    setValuesForElems(pin.offer.features, createFeature, clonedCard, '.popup__features');
    return clonedCard;
  };

  var closeCard = function () {
    var newCard = map.querySelector('.map__card');
    if (newCard) {
      map.removeChild(newCard);
    }
    document.removeEventListener('keydown', onPupopEscPress);
  };

  var showCard = function (pin) {
    var card = createCard(pin);
    var closeButton = card.querySelector('.popup__close');
    closeButton.addEventListener('click', closeCard);
    document.addEventListener('keydown', onPupopEscPress);
    return card;
  };

  var activateCard = function (pin) {
    return function () {
      var oldCard = map.querySelector('.map__card');
      if (oldCard) {
        map.removeChild(oldCard);
      }
      var card = showCard(pin);
      map.insertBefore(card, mapFilters);
    };
  };

  var onPupopEscPress = function (evt) {
    evt.preventDefault();
    if (evt.key === window.utils.ESC) {
      closeCard();
    }
  };

  window.card = {
    activate: activateCard,
    show: showCard,
    map: map,
    close: closeCard
  };
})();
