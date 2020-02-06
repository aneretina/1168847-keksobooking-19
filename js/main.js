'use strict';
var OFFERS_COUNT = 8;
var TITLES = [отель, хостел, апартаменты, квартира, бунгало, вилла, дом, замок];
var PRICES = [250, 400, 500, 700, 1000, 5000, 10000, 100050];
var TYPES = ['palace','flat','house','bungalo'];
var ROOMS = [1, 2, 3, 4, 5, 6, 7, 15];
var GUESTS = [1, 3, 5, 6, 7, 8, 20];
var CHECKTIMES = ['12:00', '13:00','14:00'];
var FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var DESCRIPTIONS = ["семейный отель", "бюджетный хостел", "уютная квартра", "на берегу моря", "элитная вилла", "загородный дома", "королевский замок"];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var LOCATION_MIN_X = 1;
var LOCATION_MAX_X = 1200;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
//1. убираем класс у map
var activateMap = function () {
  document.querySelector('.map').classList.remove('map--faded');
};
activateMap();

//   фунция для генерации случайного числа
var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + max);
};

//   фунция для генерации случайного элемента
var getRandomItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};


//создание предложения
var createOffer = function (number){
  author: {
     avatar: 'img/avatars/user' + getRandomInt(1, 8) + '.png'
   }
   {
    title: getRandomItem(TITLES),
    address: 'location.x, location.y',
    price: getRandomNumber(100, 10000000),
    type: getRandomItem(TYPES),
    room: getRandomNumber(1, 15),
    guests: getRandomNumber(1, 20),
    checkin: getRandomItem(CHECKTIMES).
    checkout: getRandomItem (CHECKTIMES),
    features: getRandomItem (FEATURES),
    description: getRandomItem(DESCRIPTIONS),
    photos: getRandomItem(PHOTOS),
  }

  location: {
        x: getRandomNumber(LOCATION_MIN_X, LOCATION_MAX_X),
        y: getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y)
      }
};
