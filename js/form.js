'use strict';

(function () {
  var TitleLength = {
    MIN: 30,
    MAX: 100
  };

  var AccomodationPrices = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000,
  };

  var GuestCounter = {
    HUNDRED: 100,
    ONE: 1,
    TWO: 2,
    THREE: 3,
    ZERO: 0
  };

  var MAX_PRICE = 1000000;

  var adForm = document.querySelector('.ad-form');
  var fields = adForm.querySelectorAll('fieldset');
  var adFormInputs = adForm.querySelectorAll('.ad-form input');

  var roomsNumber = adForm.querySelector('#room_number');
  var guestsNumber = adForm.querySelector('#capacity');

  var titleInput = adForm.querySelector('#title');
  var priceInput = adForm.querySelector('#price');
  var typeInput = adForm.querySelector('#type');
  var timeInInput = adForm.querySelector('#timein');
  var timeOutInput = adForm.querySelector('#timeout');

  var deactivateFields = function () {
    for (var i = 0; i < fields.length; i++) {
      fields[i].setAttribute('disabled', 'true');
    }
  };

  deactivateFields();

  var activateFields = function () {
    for (var i = 0; i < fields.length; i++) {
      fields[i].removeAttribute('disabled');
    }
  };

  adForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(adForm));
    evt.preventDefault();
  });

  var checkRoomValidity = function () {
    var roomsValue = parseInt(roomsNumber.value, 10);
    var guestsValue = parseInt(guestsNumber.value, 10);
    if (roomsValue === GuestCounter.ONE && guestsValue !== GuestCounter.ONE) {
      guestsNumber.setCustomValidity('1 комната — «для 1 гостя»');
    } else if (roomsValue === GuestCounter.TWO && (guestsValue === GuestCounter.ZERO || guestsValue === GuestCounter.THREE)) {
      guestsNumber.setCustomValidity('2 комнаты — «для 1 гостя», «для 2 гостей»');
    } else if (roomsValue === GuestCounter.THREE && guestsValue === GuestCounter.ZERO) {
      guestsNumber.setCustomValidity('3 комнаты — «для 3 гостей», «для 2 гостей», «для 1 гостя»');
    } else if (roomsValue === GuestCounter.HINDRED && guestsValue !== GuestCounter.ZERO) {
      guestsNumber.setCustomValidity('Допустимо 100 комнат — «не для гостей»');
    } else {
      guestsNumber.setCustomValidity('');
    }
  };

  var roomsInputHandler = function () {
    checkRoomValidity();
  };

  var checkTitleValidity = function () {
    var titleInputValue = titleInput.value;
    if (titleInputValue === '') {
      titleInput.setCustomValidity('Обязательное поле для заполнения');
    } else if (titleInputValue.length < TitleLength.MIN) {
      titleInput.setCustomValidity('Минимальное количество: 30 символов');
    } else if (titleInputValue.length > TitleLength.MAX) {
      titleInput.setCustomValidity('Максимальное количество: 100 символов');
    } else {
      titleInput.setCustomValidity('');
    }
  };

  var titleInputHandler = function () {
    checkTitleValidity();
  };

  var checkPriceValidity = function () {
    var priceInputValue = parseInt(priceInput.value, 10);
    if (priceInputValue === '') {
      priceInput.setCustomValidity('Обязательное поле для заполнения');
    } else if (priceInputValue > MAX_PRICE) {
      priceInput.setCustomValidity('Максимальная цена за ночь: 1 000 000 руб.');
    } else {
      priceInput.setCustomValidity('');
    }
  };

  var priceInputHandler = function () {
    checkPriceValidity();
    checkTypePriceValidity();
  };

  var checkTypePriceValidity = function () {
    priceInput.min = AccomodationPrices[typeInput.value.toUpperCase()];
    priceInput.placeholder = AccomodationPrices[typeInput.value.toUpperCase()];
  };

  var typeInputHandler = function () {
    checkTypePriceValidity();
  };

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

  var checkInputs = function () {
    adFormInputs.forEach(function (input) {
      if (input.checkValidity() === false) {
        input.style.border = '3px solid red';
      } else {
        input.style.border = '';
      }
    });
  };

  timeInInput.addEventListener('input', timeInInputHandler);
  timeOutInput.addEventListener('input', timeOutInputHandler);
  typeInput.addEventListener('input', typeInputHandler);
  priceInput.addEventListener('input', priceInputHandler);
  titleInput.addEventListener('input', titleInputHandler);
  guestsNumber.addEventListener('input', roomsInputHandler);
  roomsNumber.addEventListener('input', roomsInputHandler);

  adForm.addEventListener('change', function () {
    checkRoomValidity();
    checkPriceValidity();
    checkTitleValidity();
    checkTimeInValidity();
    checkTimeOutValidity();
    checkTypePriceValidity();
    checkInputs();
  });


  window.form = {
    ad: adForm,
    activateFields: activateFields,
    checkRoomValidity: checkRoomValidity,
    checkTitleValidity: checkTitleValidity,
    checkPriceValidity: checkPriceValidity,
    checkTimeInValidity: checkTimeInValidity,
    checkTimeOutValidity: checkTimeOutValidity,
  };
})();
