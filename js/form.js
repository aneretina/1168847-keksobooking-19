'use strict';

(function () {

  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;

  var RESIDENCE_PRICES = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var adForm = document.querySelector('.ad-form');
  var fields = adForm.querySelectorAll('fieldset');

  var deactivateFields = function () {
    for (var i = 0; i < fields.length; i++) {
      fields[i].setAttribute('disabled', 'true');
    }
  };

  deactivateFields();

  // Функция активации полей
  var activateFields = function () {
    for (var i = 0; i < fields.length; i++) {
      fields[i].removeAttribute('disabled');
    }
  };


  var roomsNumber = adForm.querySelector('#room_number');
  var guestsNumber = adForm.querySelector('#capacity');

  document.querySelector('.ad-form').addEventListener('submit', function (evt) {
    evt.preventDefault();
  });

  var checkRoomValidity = function () {
    var roomsValue = parseInt(roomsNumber.value, 10);
    var guestsValue = parseInt(guestsNumber.value, 10);
    if (roomsValue === 1 && guestsValue !== 1) {
      guestsNumber.setCustomValidity('1 комната — «для 1 гостя»');
    } else if (roomsValue === 2 && (guestsValue === 0 || guestsValue === 3)) {
      guestsNumber.setCustomValidity('2 комнаты — «для 1 гостя», «для 2 гостей»');
    } else if (roomsValue === 3 && guestsValue === 0) {
      guestsNumber.setCustomValidity('3 комнаты — «для 3 гостей», «для 2 гостей», «для 1 гостя»');
    } else if (roomsValue === 100 && guestsValue !== 0) {
      guestsNumber.setCustomValidity('Допустимо 100 комнат — «не для гостей»');
    } else {
      guestsNumber.setCustomValidity('');
    }
  };

  var roomsInputHandler = function () {
    checkRoomValidity();
  };

  var titleInput = adForm.querySelector('#title');

  var checkTitleValidity = function () {
    var titleInputValue = titleInput.value;
    if (titleInputValue === '') {
      titleInput.setCustomValidity('Обязательное поле для заполнения');
    } else if (titleInputValue.length < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity('Минимальное количество: 30 символов');
    } else if (titleInputValue.length > MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity('Максимальное количество: 100 символов');
    } else {
      titleInput.setCustomValidity('');
    }
  };

  var titleInputHandler = function () {
    checkTitleValidity();
  };

  var priceInput = adForm.querySelector('#price');

  var checkPriceValidity = function () {
    var priceInputValue = parseInt(priceInput.value, 10);
    if (priceInputValue === '') {
      priceInput.setCustomValidity('Обязательное поле для заполнения');
    } else if (priceInputValue > 1000000) {
      priceInput.setCustomValidity('Максимальная цена за ночь: 1 000 000 руб.');
    } else {
      priceInput.setCustomValidity('');
    }
  };

  var priceInputHandler = function () {
    checkPriceValidity();
  };

  var typeInput = adForm.querySelector('#type');

  var checkTypePriceValidity = function () {
    priceInput.min = RESIDENCE_PRICES[typeInput.value];
    priceInput.placeholder = RESIDENCE_PRICES[typeInput.value];
  };

  var typeInputHandler = function () {
    checkTypePriceValidity();
  };

  var timeInInput = adForm.querySelector('#timein');
  var timeOutInput = adForm.querySelector('#timeout');

  var checkTimeInValidity = function () {
    timeOutInput.value = timeInInput.value;
  };

  var checkTimeOutValidity = function () {
    timeInInput.value = timeOutInput.value;
  };

  var timeInInputHandler = function () {
    checkTimeInValidity();
  };

  var timeOutInputHandler = function () {
    checkTimeOutValidity();
  };

  timeInInput.addEventListener('input', timeInInputHandler);
  timeOutInput.addEventListener('input', timeOutInputHandler);
  typeInput.addEventListener('input', typeInputHandler);
  priceInput.addEventListener('input', priceInputHandler);
  titleInput.addEventListener('input', titleInputHandler);
  guestsNumber.addEventListener('input', roomsInputHandler);
  roomsNumber.addEventListener('input', roomsInputHandler);

  window.form = {
    ad: adForm,
    deactivateFields: deactivateFields,
    activateFields: activateFields,
    checkRoomValidity: checkRoomValidity,
    checkTitleValidity: checkTitleValidity,
    checkPriceValidity: checkPriceValidity,
    checkTimeInValidity: checkTimeInValidity,
    checkTimeOutValidity: checkTimeOutValidity,
  };
})();
