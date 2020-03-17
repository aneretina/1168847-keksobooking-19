'use strict';

(function () {
  var ENTER = 'Enter';
  var ESC = 'Escape';


  var errorDataHandler = function (errorMessage) {
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

  var loadHandler = function (offers) {
    window.pin.render(offers);
    window.data = offers;
  };

  var loadData = function () {
    window.backend.load(loadHandler, errorDataHandler);
  };

  window.utils = {
    loadData: loadData,
    loadHandler: loadHandler,
    errorDataHandler: errorDataHandler,
    ENTER: ENTER,
    ESC: ESC
  };
})();
