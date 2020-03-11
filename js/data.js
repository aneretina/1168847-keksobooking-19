
'use strict';

(function () {
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


  window.data = {
    errorHandler: errorDataHandler,

    LocationLimits: {
      MIN_X: 1,
      MAX_X: 1200,
      MIN_Y: 130,
      MAX_Y: 630,
    }

  };
})();
