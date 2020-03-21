'use strict';

(function () {
  var successMessage;
  var errorMessage;

  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  var errorButton = errorMessageTemplate.querySelector('.error__button');

  var showMessageOfSuccess = function () {
    successMessage = successMessageTemplate.cloneNode(true);
    main.appendChild(successMessage);
    document.addEventListener('keydown', escPressHandler);
    document.addEventListener('click', messageCloseHandler);
    window.map.deactivate();
  };

  var showMessageOfError = function () {
    errorMessage = errorMessageTemplate.cloneNode(true);
    main.appendChild(errorMessage);
    errorButton.addEventListener('click', messageCloseHandler);
    document.addEventListener('keydown', escPressHandler);
    document.addEventListener('click', messageCloseHandler);
  };

  var escPressHandler = function (evt) {
    if (evt.key === window.utils.ESC) {
      messageCloseHandler();
    }
  };

  var messageCloseHandler = function () {
    if (successMessage) {
      successMessage.remove();
    } else {
      errorMessage.remove();
    }
    errorButton.removeEventListener('click', messageCloseHandler);
    document.removeEventListener('keydown', escPressHandler);
    document.removeEventListener('click', messageCloseHandler);
  };

  window.message = {
    showError: showMessageOfError,
    showSuccess: showMessageOfSuccess
  };
})();
