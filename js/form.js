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
  var PRICE_DEFAULT = 1000;

  var adForm = document.querySelector('.ad-form');
  var fields = adForm.querySelectorAll('fieldset');

  var roomsNumber = adForm.querySelector('#room_number');
  var guestsNumber = adForm.querySelector('#capacity');

  var titleInput = adForm.querySelector('#title');
  var priceInput = adForm.querySelector('#price');
  var typeInput = adForm.querySelector('#type');
  var timeInInput = adForm.querySelector('#timein');
  var timeOutInput = adForm.querySelector('#timeout');
  var submitButton = adForm.querySelector('.ad-form__submit');
  var formResetButton = adForm.querySelector('.ad-form__reset');

  var setBorderFromInvalidInput = function (input) {
    input.style.border = 'solid 3px red';
  };

  var resetBorderFromValidInput = function (input) {
    input.style.border = 'solid 0 red';
  };

  var deactivateFields = function () {
    for (var i = 0; i < fields.length; i++) {
      fields[i].setAttribute('disabled', 'true');
    }
  };

  var activateFields = function () {
    for (var i = 0; i < fields.length; i++) {
      fields[i].removeAttribute('disabled');
    }
  };

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
      resetBorderFromValidInput(titleInput);
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
      resetBorderFromValidInput(priceInput);
    }
  };

  var checkTypePriceValidity = function () {
    priceInput.min = AccomodationPrices[typeInput.value.toUpperCase()];
    priceInput.placeholder = AccomodationPrices[typeInput.value.toUpperCase()];
  };

  var setPricedDefaultInput = function () {
    priceInput.placeholder = PRICE_DEFAULT;
  };

  var typeInputHandler = function () {
    checkTypePriceValidity();
    checkPriceValidity();
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

  var formSubmitHandler = function (evt) {
    if (!titleInput.checkValidity()) {
      setBorderFromInvalidInput(titleInput);
    }

    if (!priceInput.checkValidity()) {
      setBorderFromInvalidInput(priceInput);
    }

    if (adForm.checkValidity()) {
      window.backend.upload(new FormData(adForm), window.message.showSuccess, window.message.showError);
      evt.preventDefault();
    }
  };

  var formResetHandler = function () {
    window.map.deactivate();
    resetBorderFromValidInput(titleInput);
    resetBorderFromValidInput(priceInput);
  };

  timeInInput.addEventListener('input', timeInInputHandler);
  timeOutInput.addEventListener('input', timeOutInputHandler);
  typeInput.addEventListener('input', typeInputHandler);
  priceInput.addEventListener('input', typeInputHandler);
  titleInput.addEventListener('input', titleInputHandler);
  guestsNumber.addEventListener('input', roomsInputHandler);
  roomsNumber.addEventListener('input', roomsInputHandler);

  deactivateFields();

  submitButton.addEventListener('click', formSubmitHandler);
  formResetButton.addEventListener('click', formResetHandler);

  window.form = {
    ad: adForm,
    activateFields: activateFields,
    deactivateFields: deactivateFields,
    setPricedDefaultInput: setPricedDefaultInput,
  };
})();
