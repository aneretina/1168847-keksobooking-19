'use strict';

(function () {
  var ENTER = 'Enter';
  var ESC = 'Escape';


  var errorLoadHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: crimson; padding-top: 5px; padding-bottom: 5px';
    node.style.position = 'absolute';
    node.style.color = '#ffffff';
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = '20px';
    node.style.fontSize = '26px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var loadFilterForm = function () {
    window.filter.activate();
  };

  var successLoadHandler = function (offers) {
    window.pin.render(offers);
    window.data = offers;

    loadFilterForm();
  };

  var loadData = function () {
    window.backend.load(successLoadHandler, errorLoadHandler);
  };

  window.utils = {
    loadData: loadData,
    ENTER: ENTER,
    ESC: ESC
  };
})();
