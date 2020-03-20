'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var TIME_OUT = 10000;
  var StatusCode = {
    OK: 200
  };

  var TextError = {
    ERROR_CONNECTION: 'Произошла ошибка соединения',
    ERROR_TIMEOUT: 'Запрос не успел выполниться за ',
    ERROR_RESPONSE: 'Статус ответа: '
  };


  var setup = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(TextError.ERROR_RESPONSE + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(TextError.ERROR_CONNECTION);
    });
    xhr.addEventListener('timeout', function () {
      onError(TextError.ERROR_TIMEOUT + xhr.timeout + 'мс');
    });

    xhr.timeout = TIME_OUT;

    return xhr;
  };


  var upload = function (data, onSuccess, onError) {
    var xhr = setup(onSuccess, onError);
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };


  var load = function (onSuccess, onError) {
    var xhr = setup(onSuccess, onError);
    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  window.backend = {
    upload: upload,
    load: load
  };

})();
