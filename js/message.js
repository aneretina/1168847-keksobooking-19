'use strict';

(function () {
  var successMessage;
  var errorMessage;

  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  var errorButton = document.querySelector('.error__button');

  var showMessageOfSuccess = function () {
    successMessage = successMessageTemplate.cloneNode(true);
    main.appendChild(successMessage);
    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', closeMessage);
    window.map.deactivate();
  };

  var showMessageOfError = function () {
    errorMessage = errorMessageTemplate.cloneNode(true);
    main.appendChild(errorMessage);
    errorButton.addEventListener('click', closeMessage);
    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', closeMessage);
  };

  var onSuccessEscPress = function (evt) {
    if (evt.key === window.utils.ESC) {
      closeMessage();
    }
  };

  var closeMessage = function () {
    if (successMessage) {
      successMessage.remove();
    } else {
      errorMessage.remove();
      errorButton.removeEventListener('click', closeMessage);
    }
    document.removeEventListener('keydown', onSuccessEscPress);
    document.removeEventListener('click', closeMessage);
  };

  window.message = {
    showMessageOfError: showMessageOfError,
    showMessageOfSuccess: showMessageOfSuccess
  };
})();
