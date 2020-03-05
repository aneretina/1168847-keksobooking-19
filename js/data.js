
'use strict';

(function () {
  var TITLES = ['отель', 'хостел', 'апартаменты', 'квартира', 'бунгало', 'вилла', 'дом', 'замок'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKTIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['семейный отель', 'бюджетный хостел', 'уютная квартра', 'на берегу моря', 'элитная вилла', 'загородный дом', 'королевский замок'];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var LOCATION_MIN_X = 1;
  var LOCATION_MAX_X = 1200;
  var LOCATION_MIN_Y = 130;
  var LOCATION_MAX_Y = 630;

  var OFFERS_COUNT = 8;

  var createOffers = function (number) {
    var offerList = [];
    for (var i = 0; i < number; i++) {
      var coordinateX = window.utils.getRandomNumber(LOCATION_MIN_X, LOCATION_MAX_X);
      var coordinateY = window.utils.getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y);
      offerList.push({
        author: {
          avatar: 'img/avatars/user' + '0' + window.utils.getRandomNumber(1, 8) + '.png'
        },
        offer: {
          title: window.utils.getRandomItem(TITLES),
          address: coordinateX + ', ' + coordinateY,
          price: window.utils.getRandomNumber(100, 10000000),
          type: window.utils.getRandomItem(TYPES),
          rooms: window.utils.getRandomNumber(1, 15),
          guests: window.utils.getRandomNumber(1, 20),
          checkin: window.utils.getRandomItem(CHECKTIMES),
          checkout: window.utils.getRandomItem(CHECKTIMES),
          features: window.utils.getRandomItem(FEATURES),
          description: window.utils.getRandomItem(DESCRIPTIONS),
          photos: window.utils.getRandomLength(PHOTOS),
        },
        location: {
          x: coordinateX,
          y: coordinateY
        }
      });
    }
    return offerList;
  };

  var genOffer = createOffers(OFFERS_COUNT);

  window.data = {
    genOffer: genOffer
  };
})();
