'use strict';
var OFFERS_COUNT = 8;
var TITLES = ['отель', 'хостел', 'апартаменты', 'квартира', 'бунгало', 'вилла', 'дом', 'замок'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKTIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['семейный отель', 'бюджетный хостел', 'уютная квартра', 'на берегу моря', 'элитная вилла', 'загородный дом', 'королевский замок'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var RESIDENCE_TYPES = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало',
  palace: 'Дворец'
};

var LOCATION_MIN_X = 1;
var LOCATION_MAX_X = 1200;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;

var PIN_WIDTH = 40;
var PIN_HEIGHT = 44;


// 2. убираем класс у map
var activateMap = function () {
  document.querySelector('.map').classList.remove('map--faded');
};
activateMap();

//   фунция для генерации случайного числа
var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

//   фунция для генерации случайного элемента
var getRandomItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// создание предложения
var createOffers = function (number) {
  var offerList = [];
  for (var i = 0; i < number; i++) {
    offerList.push({
      author: {
        avatar: 'img/avatars/user' + '0' + getRandomNumber(1, 8) + '.png'
      },
      offer: {
        title: getRandomItem(TITLES),
        address: 'location.x, location.y',
        price: getRandomNumber(100, 10000000),
        type: getRandomItem(TYPES),
        room: getRandomNumber(1, 15),
        guests: getRandomNumber(1, 20),
        checkin: getRandomItem(CHECKTIMES),
        checkout: getRandomItem(CHECKTIMES),
        features: getRandomItem(FEATURES),
        description: getRandomItem(DESCRIPTIONS),
        photos: getRandomItem(PHOTOS),
      },
      location: {
        x: getRandomNumber(LOCATION_MIN_X, LOCATION_MAX_X),
        y: getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y)
      }
    });
  }
  return offerList;
};

var genOffer = createOffers(OFFERS_COUNT);

// Задание 3.3
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

var createPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < OFFERS_COUNT; i++) {
    fragment.appendChild(createPin(genOffer[i]));
  }
  mapPins.appendChild(fragment);
};

createPins();

// Задание 3.3
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var clonedCard = cardTemplate.cloneNode(true);
// создаю карточки на основе данных
var createCard = function (cardElement) {
  clonedCard.querySelector('.popup__avatar').src = cardElement.author.avatar;
  clonedCard.querySelector('.popup__title').textContent = cardElement.offer.title;
  clonedCard.querySelector('.popup__text--address').textContent = cardElement.offer.address;
  clonedCard.querySelector('.popup__text--price').textContent = cardElement.offer.price + '₽/ночь';
  clonedCard.querySelector('.popup__type').textContent = RESIDENCE_TYPES[cardElement.offer.type];
  clonedCard.querySelector('.popup__text--capacity').textContent = cardElement.offer.rooms + ' комнаты для ' + cardElement.offer.guests + ' гостей';
  clonedCard.querySelector('.popup__text--time').textContent = 'заезд после ' + cardElement.offer.checkin + ', выезд до ' + cardElement.offer.checkout;
  clonedCard.querySelector('.popup__description').textContent = cardElement.offer.description;

  var photoCards = clonedCard.querySelector('.popup__photos');
  var photoCard = photoCards.querySelector('.popup__photo');
  for (var i = 0; i < OFFERS_COUNT; i++) {
    photoCard.src = cardElement.offer.photos[i];
    photoCards.appendChild(photoCard);
  }
  return clonedCard;
};

var map = document.querySelector('.map');
var mapFilters = map.querySelector('.map__filters-container');

var createCards = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < OFFERS_COUNT; i++) {
    fragment.appendChild(createPin(createCard[i]));
  }
  map.insertBefore(fragment, mapFilters);
};

createCards();
