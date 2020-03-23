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
    document.addEventListener('click', elementRemoveHandler);
    window.map.deactivate();
  };

  var showMessageOfError = function () {
    errorMessage = errorMessageTemplate.cloneNode(true);
    main.appendChild(errorMessage);
    errorButton.addEventListener('click', elementRemoveHandler);
    document.addEventListener('keydown', escPressHandler);
    document.addEventListener('click', elementRemoveHandler);
  };

  var escPressHandler = function (evt) {
    if (evt.key === window.utils.ESC) {
      elementRemoveHandler();
    }
  };

  var elementRemoveHandler = function () {
    if (successMessage) {
      successMessage.remove();
    } else {
      errorMessage.remove();
    }
    errorButton.removeEventListener('click', elementRemoveHandler);
    document.removeEventListener('keydown', escPressHandler);
    document.removeEventListener('click', elementRemoveHandler);
  };

  window.message = {
    showError: showMessageOfError,
    showSuccess: showMessageOfSuccess
  };
})();
