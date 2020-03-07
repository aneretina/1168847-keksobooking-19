'use strict';

(function () {
  var accomodationTypes = {
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало',
    PALACE: 'Дворец'
  };

  var keys = {
    ENTER: 'Enter',
    ESC: 'Escape'
  };

  var featuresClassMap = {
    WIFI: 'popup__feature--wifi',
    DISHWASHER: 'popup__feature--dishwasher',
    PARKING: 'popup__feature--parking',
    WASHER: 'popup__feature--washer',
    ELEVATOR: 'popup__feature--elevator',
    CONDITIONER: 'popup__feature--conditioner'
  };

  var accomodationPhotos = {
    NAME: 'Фотография жилья',
    WIDTH: '45',
    HEIGHT: '40'
  };

  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var setCardValue = function (node, className, value) {
    var cardItem = node.querySelector(className);

    if (value) {
      cardItem.textContent = value;
      cardItem.src = value;
    } else {
      cardItem.style.display = 'none';
    }
  };

  var createFeature = function (value) {
    var featureElement = document.createElement('li');
    featureElement.classlist.add(featuresClassMap + value);
    return featureElement;
  };

  var createPhoto = function (value, photoSrc) {
    var photoElement = document.createElement('img');
    photoElement.className = 'popup__photo';
    photoElement.src = photoSrc;
    photoElement.alt = accomodationPhotos.NAME;
    photoElement.width = accomodationPhotos.WIDTH;
    photoElement.height = accomodationPhotos.HEIGHT;
  };

  var setValuesForElems = function (values, cb, node, className) {
    var unit = node.guerySellector(className);
    unit.innerHTML = '';

    values.forEach(function (item) {
      var element = cb(item);

      unit.appendChild(element);
    });
  };

  var createCard = function (pin) {
    var clonedCard = cardTemplate.cloneNode(true);
    setCardValue(clonedCard, 'popup__avatar', pin.author.avatar);
    setCardValue(clonedCard, 'popup__title', pin.offer.title);
    setCardValue(clonedCard, 'popup__text--address', pin.offer.address);
    setCardValue(clonedCard, 'popup__text--price', pin.offer.price ? pin.offer.price + '₽/ночь' : '');
    setCardValue(clonedCard, 'popup__text--type', accomodationTypes[pin.offer.type]);
    setCardValue(clonedCard, 'popup__text--capacity', pin.offer.rooms && pin.offer.guests ? pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей' : '');
    setCardValue(clonedCard, 'popup__text--time', pin.offer.checkin && pin.offer.checkout ? 'заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout : '');
    setCardValue(clonedCard, 'popup__description', pin.offer.description);

    setValuesForElems(pin.offer.photos, createPhoto, closeCard, '.popup__photos');
    setValuesForElems(pin.offer.features, createFeature, closeCard, '.popup__features');
    return clonedCard;
  };

  var closeCard = function () {
    var newCard = map.querySelector('.map__card');
    if (newCard) {
      map.removeChild(newCard);
    }
  };

  var showCard = function (pin) {
    var card = createCard(pin);
    var closeButton = card.querySelector('.popup__close');
    closeButton.addEventListener('click', closeCard);
    closeButton.addEventListener('keydown', onPupopEscPress);
  };

  var onPupopEscPress = function (evt) {
    evt.preventDefault();
    if (evt.key === keys.ESC) {
      window.card.closeCard();
    }
  };

  window.card = {
    show: showCard,
    map: map
  };
})();
