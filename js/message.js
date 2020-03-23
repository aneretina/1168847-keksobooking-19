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
    document.addEventListener('click', messageRemoveHandler);
    window.map.deactivate();
  };

  var showMessageOfError = function () {
    errorMessage = errorMessageTemplate.cloneNode(true);
    main.appendChild(errorMessage);
    errorButton.addEventListener('click', messageRemoveHandler);
    document.addEventListener('keydown', escPressHandler);
    document.addEventListener('click', messageRemoveHandler);
  };

  var removeMessage = function () {
    if (successMessage) {
      successMessage.remove();
    } else {
      errorMessage.remove();
    }

    errorButton.removeEventListener('click', messageRemoveHandler);
    document.removeEventListener('keydown', escPressHandler);
    document.removeEventListener('click', messageRemoveHandler);
  }

  var escPressHandler = function (evt) {
    if (evt.key === window.utils.ESC) {
      removeMessage();
    }
  };

  var messageRemoveHandler = function () {
    removeMessage()
  };

  window.message = {
    showError: showMessageOfError,
    showSuccess: showMessageOfSuccess
  };
})();
